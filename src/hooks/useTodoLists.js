import useSWR from 'swr';

import { APIs, fetcher, putter, db } from '../utils.js';

export function useTodoLists() {
  const { data = [], mutate } = useSWR({ url: APIs.TodoLists }, fetcher);

  return {
    data,
    async newList(newListName, icon) {
      return await mutate(
        await putter({
          url: APIs.TodoLists,
          icon: icon || 'List',
          name: newListName,
        }),
        {
          populateCache: false,
          optimisticData: oldData => [
            ...oldData,
            { name: newListName, icon: icon || 'List', data: [] },
          ],
        }
      );
    },
    async updateList(listToUpdate, newListName) {
      await mutate(
        await putter({
          url: APIs.TodoListsUpdate,
          id: listToUpdate,
          name: newListName,
        }),
        {
          populateCache: false,
          optimisticData: oldData =>
            oldData.map(d => {
              if (d.id === listToUpdate) {
                return { ...d, name: newListName };
              }
              return d;
            }),
        }
      );
    },
    async deleteList(listId) {
      // Update the database
      await db.transaction('rw', db.lists, db.listItems, async () => {
        // Delete the list itself
        await db.lists.delete(listId);
        // Delete all items associated with the list
        await db.listItems.where({ listId }).delete();
      });

      // Mutate the cache to remove the list
      await mutate(
        oldData => oldData.filter(list => list.id !== listId),
        { revalidate: false }
      );
    },
  };
}

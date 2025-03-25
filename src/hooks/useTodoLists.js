import useSWR from 'swr';

<<<<<<< HEAD
import { APIs, fetcher, putter, db } from '../utils.js';
=======
import { APIs, fetcher, putter } from '../utils.js';
>>>>>>> 18c22ae (Second commit)

export function useTodoLists() {
  const { data = [], mutate } = useSWR({ url: APIs.TodoLists }, fetcher);

  return {
    data,
    async newList(newListName, icon) {
<<<<<<< HEAD
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
=======
      try {
        return await mutate(
          await putter({
            url: APIs.TodoLists,
            icon: icon || 'List', // note: not using default param since an empty string is the default and won't be falsy
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
      } catch (error) {
        console.log('Error creating new list:', error);
      }
    },
    async deleteList(listToDelete) {
      try {
        const result = await putter({
          url: APIs.TodoListsDelete,
          id: listToDelete,
        });
        // Force revalidation: if the current array has only one element (the one being deleted), clear it.
        mutate(
          currentLists =>
            currentLists && currentLists.length === 1
              ? []
              : currentLists.filter(list => list.id !== listToDelete),
          { revalidate: true }
        );
        return result;
      } catch (error) {
        console.log('Error deleting list:', error);
      }
    },
    async updateList(listToUpdate, newListName) {
      try {
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
      } catch (error) {
        console.log('Error updating list name:', error);
      }
>>>>>>> 18c22ae (Second commit)
    },
  };
}

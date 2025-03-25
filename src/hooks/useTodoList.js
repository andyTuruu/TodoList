import useSWR from 'swr';

<<<<<<< HEAD
import { APIs, fetcher, putter} from '../utils.js';
=======
import { APIs, fetcher, putter } from '../utils.js';
>>>>>>> 18c22ae (Second commit)

export function useTodoList(currentList) {
  const { data, mutate } = useSWR(
    () => currentList && { url: APIs.TodoList, id: currentList },
    fetcher
  );

  return {
    data,
<<<<<<< HEAD
    async newItem(newItemName) {
=======
    async newItem(
      newItemName,
      startDate = null,
      endDate = null,
      priority = 'low'
    ) {
>>>>>>> 18c22ae (Second commit)
      const newItemsData = {
        name: newItemName,
        checked: false,
        id: crypto.randomUUID(),
<<<<<<< HEAD
      };
      return await mutate(
        await putter({
          url: APIs.TodoList,
          id: currentList,
          name: newItemName,
        }),
        {
          populateCache: false, // because our putter doesn't return the new item so we want to refetch it instead
          optimisticData: oldData => ({
            ...oldData,
            items: [...oldData.items, newItemsData],
          }),
        }
      );
    },
    async deleteItem(itemToDelete) {
      return await mutate(
        await putter({
          url: APIs.TodoListDelete,
          id: itemToDelete,
        }),
        {
          populateCache: false, // because our putter doesn't return the new item so we want to refetch it instead
          optimisticData: oldData => ({
            ...oldData,
            items: oldData.items.filter(({ id }) => id !== itemToDelete),
          }),
        }
      );
    },
    async toggleChecked(itemToToggle) {
      return await mutate(
        await putter({
          url: APIs.TodoListUpdate,
          id: itemToToggle,
          checked: !data.items.find(({ id }) => id === itemToToggle).checked,
        }),
        {
          populateCache: false,
          optimisticData: oldData => {
            const oldItem = oldData.items.find(({ id }) => id === itemToToggle);
            return {
              ...oldData,
              items: [
                ...oldData.items.slice(
                  0,
                  oldData.items.findIndex(({ id }) => id === itemToToggle)
                ),
                { ...oldItem, checked: !oldItem.checked },
                ...oldData.items.slice(
                  oldData.items.findIndex(({ id }) => id === itemToToggle) + 1
                ),
              ],
            };
          },
        }
      );
    },
    async updateItem(itemToToUpdate, newItemName) {
      return await mutate(
        await putter({
          url: APIs.TodoListUpdate,
          id: itemToToUpdate,
          name: newItemName,
        }),
        {
          populateCache: false,
          optimisticData: oldData => {
            const oldItem = oldData.items.find(
              ({ id }) => id === itemToToUpdate
            );
            return {
              ...oldData,
              items: [
                ...oldData.items.slice(
                  0,
                  oldData.items.findIndex(({ id }) => id === itemToToUpdate)
                ),
                { ...oldItem, name: newItemName },
                ...oldData.items.slice(
                  oldData.items.findIndex(({ id }) => id === itemToToUpdate) + 1
                ),
              ],
            };
          },
        }
      );
=======
        startDate,
        endDate,
        priority,
      };
      try {
        return await mutate(
          await putter({
            url: APIs.TodoList,
            id: currentList,
            name: newItemName,
            startDate,
            endDate,
            priority,
          }),
          {
            populateCache: false, // because our putter doesn't return the new item so we want to refetch it instead
            optimisticData: oldData => ({
              ...oldData,
              items: [...oldData.items, newItemsData],
            }),
          }
        );
      } catch (error) {
        console.log('Error creating new item', error);
      }
    },
    async deleteItem(itemToDelete) {
      try {
        return await mutate(
          await putter({
            url: APIs.TodoListDelete,
            id: itemToDelete,
          }),
          {
            populateCache: false,
            optimisticData: oldData => ({
              ...oldData,
              items: oldData.items.filter(({ id }) => id !== itemToDelete),
            }),
          }
        );
      } catch (error) {
        console.log('Error deleting item:', error);
      }
    },
    async toggleChecked(itemToToggle) {
      try {
        const currentItem = data?.items?.find(({ id }) => id === itemToToggle);
        if (!currentItem) {
          console.error('Item not found for toggling:', itemToToggle);
          return;
        }
        return await mutate(
          await putter({
            url: APIs.TodoListUpdate,
            id: itemToToggle,
            checked: !data.items.find(({ id }) => id === itemToToggle).checked,
          }),
          {
            populateCache: false,
            optimisticData: oldData => ({
              ...oldData,
              items: oldData.items.map(item =>
                item.id === itemToToggle
                  ? { ...item, checked: !item.checked }
                  : item
              ),
            }),
          }
        );
      } catch (error) {
        console.log('Error toggling item:', error);
      }
    },
    async updateItem(
      itemToUpdate,
      newItemName,
      newItemStartDate,
      newItemEndDate,
      newItemPriority
    ) {
      try {
        return await mutate(
          await putter({
            url: APIs.TodoListUpdate,
            id: itemToUpdate,
            name: newItemName,
            startDate: newItemStartDate,
            endDate: newItemEndDate,
            priority: newItemPriority,
          }),
          {
            populateCache: false,
            optimisticData: oldData => ({
              ...oldData,
              items: oldData.items.map(item => {
                if (item.id !== itemToUpdate) return item;
                return {
                  ...item,
                  ...(newItemName !== item.name ? { name: newItemName } : {}),
                  ...(newItemStartDate !== item.startDate
                    ? { startDate: newItemStartDate }
                    : {}),
                  ...(newItemEndDate !== item.endDate
                    ? { endDate: newItemEndDate }
                    : {}),
                  ...(newItemPriority !== item.priority
                    ? { priority: newItemPriority }
                    : {}),
                };
              }),
            }),
          }
        );
      } catch (error) {
        console.log('Error updating item:', error);
      }
>>>>>>> 18c22ae (Second commit)
    },
  };
}

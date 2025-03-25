import Dexie from 'dexie';

export const db = new Dexie('todo-list-db');
db.version(2).stores({
  lists: '++id, name', // Primary key and indexed props
<<<<<<< HEAD
  listItems: '++id, name, checked, listId', // Primary key and indexed props
=======
  listItems: '++id, name, checked, listId, startDate, endDate, priority',
>>>>>>> 18c22ae (Second commit)
});

export const APIs = {
  TodoLists: 'todo-lists',
<<<<<<< HEAD
=======
  TodoListsDelete: 'todo-lists-delete',
>>>>>>> 18c22ae (Second commit)
  TodoListsUpdate: 'todo-lists-update',
  TodoList: 'todo-list',
  TodoListDelete: 'todo-list-delete',
  TodoListUpdate: 'todo-list-update',
};

export async function fetcher({ url, ...variables }) {
  switch (url) {
    case APIs.TodoLists:
      return db.lists.toArray();
    case APIs.TodoList:
      return {
        ...(await db.lists.get(variables.id)),
        items:
          (await db.listItems.where({ listId: variables.id }).toArray()) ?? [],
      };
    default:
      throw new Error(`Unknown API ${url}`);
  }
}

export async function putter({ url, id, ...variables }) {
  switch (url) {
    case APIs.TodoLists:
      return db.lists.add({ name: variables.name, icon: variables.icon });
<<<<<<< HEAD
    case APIs.TodoListsUpdate:
      return db.lists.update(id, { name: variables.name });
    case APIs.TodoList:
      return db.listItems.add({ listId: id, name: variables.name });
=======
    case APIs.TodoListsDelete:
      return db.lists.delete(id);
    case APIs.TodoListsUpdate:
      return db.lists.update(id, { name: variables.name });
    case APIs.TodoList:
      return db.listItems.add({
        listId: id,
        name: variables.name,
        startDate: variables.startDate,
        endDate: variables.endDate,
        priority: variables.priority,
      });
>>>>>>> 18c22ae (Second commit)
    case APIs.TodoListDelete:
      return db.listItems.delete(id);
    case APIs.TodoListUpdate:
      return db.listItems.update(id, variables);
    default:
      throw new Error(`Unknown API ${url}`);
  }
}

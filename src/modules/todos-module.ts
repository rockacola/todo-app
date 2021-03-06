import { TodoItemRS } from '../interfaces'

const TODO_ITEMS_BASE_DIR = process.env.REACT_APP_STORAGE_TODO_ITEMS_BASE_DIR

export const TodosModule = {
  name: process.env.REACT_APP_STORAGE_CLAIM_DIR,
  builder: (privateClient: any) => {
    privateClient.declareType('todoItem', {
      type: 'object',
      properties: {
        id: { type: 'string' },
        listId: { type: 'string' },
        title: { type: 'string' },
        completedAt: { type: 'number' },
        createdAt: { type: 'number' },
        updatedAt: { type: 'number' },
      },
      required: ['id', 'listId', 'title', 'createdAt'],
    })

    return {
      exports: {
        init: () => {
          privateClient.cache(TODO_ITEMS_BASE_DIR)
        },

        on: privateClient.on,

        addTodoItem: async (item: TodoItemRS) => {
          const path = TODO_ITEMS_BASE_DIR + item.id
          return privateClient.storeObject('todoItem', path, item)
        },

        updateTodoItem: async (item: TodoItemRS) => {
          const path = TODO_ITEMS_BASE_DIR + item.id
          return privateClient.storeObject('todoItem', path, item)
        },

        removeTodoItem: async (id: string) => {
          const path = TODO_ITEMS_BASE_DIR + id
          return privateClient.remove(path)
        },

        listTodoItems: async () => {
          return privateClient.getAll(TODO_ITEMS_BASE_DIR)
        },
      },
    }
  },
}

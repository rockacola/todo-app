import { TodoItemRS } from '../interfaces'

export const TodosModule = {
  name: 'myTodos',
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
          privateClient.cache('')
        },

        on: privateClient.on,

        addTodoItem: (item: TodoItemRS) => {
          return privateClient.storeObject('todoItem', item.id, item)
        },

        // TODO: updateTodoItem

        removeTodoItem: privateClient.remove.bind(privateClient),

        listTodoItems: () => {
          // TODO: look into proper namespace/prefix setup
          return privateClient.getAll('')
        },

        // TODO: get 'last sync at' timestamp
      },
    }
  },
}

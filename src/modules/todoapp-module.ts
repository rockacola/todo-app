export const TodoAppModule = {
  name: 'todo-app',
  builder: (privateClient: any) => {
    privateClient.declareType('todo', {
      type: 'object',
      properties: {
        title: { type: 'string' },
        isComplete: { type: 'boolean' },
      },
      required: ['title', 'isCompleted']
    });

    return {
      exports: {

        init: () => {
          privateClient.cache('');
        },

        on: privateClient.on,

        addTodoItem: (title: string, isComplete: boolean) => {
          const id = title.toLowerCase().replace(/\s|\//g, '-'); // TODO
          return privateClient.storeObject('todo-item', id, {
            title,
            isComplete,
          });
        },

        removeTodoItem: privateClient.remove.bind(privateClient),

        listTodoItems: () => {
          return privateClient.getAll('');
        }
      }
    }
  }
};

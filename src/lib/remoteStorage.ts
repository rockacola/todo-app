import RemoteStorage from 'remotestoragejs';
import type BaseClient from 'remotestoragejs/release/types/baseclient';

export interface TodoItem {
  id: string;
  text: string;
  done: boolean;
  createdAt: number;
}

const todosModule = {
  name: 'todos',
  builder(privateClient: BaseClient) {
    privateClient.declareType('item', {
      properties: {
        createdAt: { type: 'number' },
        done: { type: 'boolean' },
        id: { type: 'string' },
        text: { type: 'string' },
      },
      required: ['id', 'text', 'done', 'createdAt'],
      type: 'object',
    });

    return {
      exports: {
        async save(todo: TodoItem): Promise<void> {
          await privateClient.storeObject('item', todo.id, todo);
        },

        async getAll(): Promise<TodoItem[]> {
          const result = await privateClient.getAll('');
          return Object.values(result ?? {}).filter(
            (v): v is TodoItem => typeof v === 'object' && v !== null,
          );
        },

        async remove(id: string): Promise<void> {
          await privateClient.remove(id);
        },

        on(event: string, handler: (...args: unknown[]) => void): void {
          privateClient.on(event, handler);
        },
      },
    };
  },
};

export const rs = new RemoteStorage({
  modules: [todosModule],
  changeEvents: { local: true, window: true, remote: true, conflict: true },
});

rs.access.claim('todos', 'rw');
rs.caching.enable('/todos/');

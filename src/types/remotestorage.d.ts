import type { TodoItem } from '../lib/remoteStorage';

declare module 'remotestoragejs' {
  interface RemoteStorage {
    todos: {
      getAll(): Promise<TodoItem[]>;
      on(event: string, handler: (...args: unknown[]) => void): void;
      remove(id: string): Promise<void>;
      save(todo: TodoItem): Promise<void>;
    };
  }
}

export {};

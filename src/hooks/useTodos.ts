import { useState, useEffect, useCallback } from 'react';
import { rs } from '../lib/remoteStorage';
import type { TodoItem } from '../lib/remoteStorage';

function sortByCreated(items: TodoItem[]): TodoItem[] {
  return [...items].sort((a, b) => a.createdAt - b.createdAt);
}

export function useTodos() {
  const [todos, setTodos] = useState<TodoItem[]>([]);

  // Non-async: setState only fires inside .then(), never synchronously in an effect body
  const reload = useCallback(() => {
    rs.todos.getAll().then((items) => setTodos(sortByCreated(items)));
  }, []);

  useEffect(() => {
    rs.todos.on('change', reload);
    reload();
  }, [reload]);

  const addTodo = useCallback(async (text: string) => {
    await rs.todos.save({
      createdAt: Date.now(),
      done: false,
      id: crypto.randomUUID(),
      text,
    });
  }, []);

  const toggleTodo = useCallback(
    async (id: string) => {
      const todo = todos.find((t) => t.id === id);
      if (!todo) return;
      await rs.todos.save({ ...todo, done: !todo.done });
    },
    [todos],
  );

  const removeTodo = useCallback(async (id: string) => {
    await rs.todos.remove(id);
  }, []);

  const clearCompleted = useCallback(async () => {
    const completed = todos.filter((t) => t.done);
    await Promise.all(completed.map((t) => rs.todos.remove(t.id)));
  }, [todos]);

  return { todos, addTodo, toggleTodo, removeTodo, clearCompleted };
}

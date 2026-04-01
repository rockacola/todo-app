// vi.mock() intercepts this module before it is ever evaluated, so the real
// RemoteStorage constructor (which probes DOM APIs and tries to open IndexedDB)
// never runs. Vitest hoists vi.mock() calls above all imports automatically.
import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { rs } from '../lib/remoteStorage';

import { useTodos } from './useTodos';

vi.mock('../lib/remoteStorage', () => ({
  rs: {
    todos: {
      // vi.fn() creates a spy function. We set default return values in beforeEach
      // and can override them per-test with .mockResolvedValue() / .mockReturnValue().
      getAll: vi.fn(),
      on: vi.fn(),
      remove: vi.fn(),
      save: vi.fn(),
    },
  },
}));

describe('useTodos', () => {
  beforeEach(() => {
    // Reset all spies between tests so call counts and return values don't bleed
    // across test cases.
    vi.clearAllMocks();

    // Default: storage starts empty and all writes succeed.
    vi.mocked(rs.todos.getAll).mockResolvedValue([]);
    vi.mocked(rs.todos.save).mockResolvedValue(undefined);
    vi.mocked(rs.todos.remove).mockResolvedValue(undefined);
  });

  it('starts with an empty todo list', async () => {
    const { result } = renderHook(() => useTodos());

    // act() flushes React state updates and effects. The empty await here lets
    // the getAll() Promise resolve and setTodos() run before we assert.
    await act(async () => {});

    expect(result.current.todos).toEqual([]);
  });

  it('addTodo saves a new item with the correct shape', async () => {
    const { result } = renderHook(() => useTodos());
    await act(async () => {});

    await act(async () => {
      await result.current.addTodo('Buy milk');
    });

    // expect.objectContaining() lets us assert on specific fields without
    // hard-coding the auto-generated id or exact timestamp.
    expect(rs.todos.save).toHaveBeenCalledWith(
      expect.objectContaining({
        createdAt: expect.any(Number),
        done: false,
        id: expect.any(String),
        text: 'Buy milk',
      }),
    );
  });

  it('toggleTodo flips the done flag', async () => {
    const todo = { createdAt: 1000, done: false, id: '1', text: 'Test' };
    vi.mocked(rs.todos.getAll).mockResolvedValue([todo]);

    const { result } = renderHook(() => useTodos());
    await act(async () => {}); // wait for initial load

    await act(async () => {
      await result.current.toggleTodo('1');
    });

    expect(rs.todos.save).toHaveBeenCalledWith({ ...todo, done: true });
  });

  it('toggleTodo does nothing for an unknown id', async () => {
    const { result } = renderHook(() => useTodos());
    await act(async () => {});

    await act(async () => {
      await result.current.toggleTodo('nonexistent');
    });

    expect(rs.todos.save).not.toHaveBeenCalled();
  });

  it('removeTodo calls remove with the correct id', async () => {
    const { result } = renderHook(() => useTodos());
    await act(async () => {});

    await act(async () => {
      await result.current.removeTodo('abc');
    });

    expect(rs.todos.remove).toHaveBeenCalledWith('abc');
  });

  it('clearCompleted removes only done items', async () => {
    const todos = [
      { createdAt: 1000, done: true, id: '1', text: 'Done' },
      { createdAt: 2000, done: false, id: '2', text: 'Pending' },
    ];
    vi.mocked(rs.todos.getAll).mockResolvedValue(todos);

    const { result } = renderHook(() => useTodos());
    await act(async () => {}); // wait for initial load

    await act(async () => {
      await result.current.clearCompleted();
    });

    // Only the completed item ('1') should be removed.
    expect(rs.todos.remove).toHaveBeenCalledTimes(1);
    expect(rs.todos.remove).toHaveBeenCalledWith('1');
  });

  it('sorts todos by createdAt ascending', async () => {
    const todos = [
      { createdAt: 3000, done: false, id: '3', text: 'C' },
      { createdAt: 1000, done: false, id: '1', text: 'A' },
      { createdAt: 2000, done: false, id: '2', text: 'B' },
    ];
    vi.mocked(rs.todos.getAll).mockResolvedValue(todos);

    const { result } = renderHook(() => useTodos());
    await act(async () => {});

    expect(result.current.todos.map((t) => t.id)).toEqual(['1', '2', '3']);
  });
});

import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { rs } from '../lib/remoteStorage';

import { useRemoteStorage } from './useRemoteStorage';

vi.mock('../lib/remoteStorage', () => ({
  rs: {
    // These are plain mutable properties — tests can set them before rendering
    // to control the hook's initial state (e.g. simulate "already connected").
    connected: false,
    remote: { userAddress: undefined as string | undefined },

    // Spy functions so we can (a) assert they were called and (b) inspect which
    // handlers were registered, then call them to simulate RemoteStorage events.
    on: vi.fn(),
    removeEventListener: vi.fn(),
  },
}));

// Helper: look up the handler that the hook registered for a given event name.
// The hook calls rs.on(event, handler) inside useEffect, so by the time
// renderHook() returns, mock.calls already contains every registration.
const getHandler = (event: string): ((...args: unknown[]) => void) | undefined =>
  vi.mocked(rs.on).mock.calls.find(([e]) => e === event)?.[1];

describe('useRemoteStorage', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    // Reset mutable mock properties to a clean disconnected state.
    (rs as { connected: boolean }).connected = false;
    (rs.remote as { userAddress: string | undefined }).userAddress = undefined;
  });

  it('reports disconnected when rs.connected is false', () => {
    const { result } = renderHook(() => useRemoteStorage());
    expect(result.current.status).toBe('disconnected');
  });

  it('reports connected when rs.connected is already true on mount', () => {
    (rs as { connected: boolean }).connected = true;
    (rs.remote as { userAddress: string | undefined }).userAddress = 'alice@example.com';

    const { result } = renderHook(() => useRemoteStorage());

    expect(result.current.status).toBe('connected');
    expect(result.current.userAddress).toBe('alice@example.com');
  });

  it('updates status to connected when the connected event fires', () => {
    const { result } = renderHook(() => useRemoteStorage());
    expect(result.current.status).toBe('disconnected');

    (rs.remote as { userAddress: string | undefined }).userAddress = 'bob@example.com';

    // Wrap in act() because calling the handler triggers a React state update.
    act(() => {
      getHandler('connected')?.();
    });

    expect(result.current.status).toBe('connected');
    expect(result.current.userAddress).toBe('bob@example.com');
  });

  it('updates status to disconnected when the disconnected event fires', () => {
    (rs as { connected: boolean }).connected = true;
    (rs.remote as { userAddress: string | undefined }).userAddress = 'alice@example.com';

    const { result } = renderHook(() => useRemoteStorage());
    expect(result.current.status).toBe('connected');

    act(() => {
      getHandler('disconnected')?.();
    });

    expect(result.current.status).toBe('disconnected');
    expect(result.current.userAddress).toBeNull();
  });

  it('updates status to disconnected when the not-connected event fires', () => {
    (rs as { connected: boolean }).connected = true;
    const { result } = renderHook(() => useRemoteStorage());

    act(() => {
      getHandler('not-connected')?.();
    });

    expect(result.current.status).toBe('disconnected');
  });

  it('sets isSyncing to true when sync-started fires, false when sync-done fires', () => {
    const { result } = renderHook(() => useRemoteStorage());
    expect(result.current.isSyncing).toBe(false);

    act(() => {
      getHandler('sync-started')?.();
    });
    expect(result.current.isSyncing).toBe(true);

    act(() => {
      getHandler('sync-done')?.();
    });
    expect(result.current.isSyncing).toBe(false);
  });

  it('removes all event listeners when the component unmounts', () => {
    const { unmount } = renderHook(() => useRemoteStorage());

    unmount();

    // The hook registers 5 events (connected, disconnected, not-connected,
    // sync-started, sync-done) and must clean all of them up to avoid memory
    // leaks and phantom state updates after unmount.
    expect(rs.removeEventListener).toHaveBeenCalledTimes(5);
  });
});

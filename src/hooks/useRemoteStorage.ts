import { useEffect, useState } from 'react';

import { rs } from '../lib/remoteStorage';

export type StorageStatus = 'connected' | 'disconnected';

export interface RemoteStorageResult {
  isSyncing: boolean;
  status: StorageStatus;
  userAddress: string | null;
}

export function useRemoteStorage(): RemoteStorageResult {
  const [status, setStatus] = useState<StorageStatus>(rs.connected ? 'connected' : 'disconnected');
  const [isSyncing, setIsSyncing] = useState(false);
  const [userAddress, setUserAddress] = useState<string | null>(rs.remote.userAddress ?? null);

  useEffect(() => {
    const onConnected = () => {
      setStatus('connected');
      setUserAddress(rs.remote.userAddress ?? null);
    };
    const onDisconnected = () => {
      setStatus('disconnected');
      setUserAddress(null);
    };
    const onNotConnected = () => setStatus('disconnected');
    const onSyncStarted = () => setIsSyncing(true);
    const onSyncDone = () => setIsSyncing(false);

    rs.on('connected', onConnected);
    rs.on('disconnected', onDisconnected);
    rs.on('not-connected', onNotConnected);
    rs.on('sync-started', onSyncStarted);
    rs.on('sync-done', onSyncDone);

    return () => {
      rs.removeEventListener('connected', onConnected);
      rs.removeEventListener('disconnected', onDisconnected);
      rs.removeEventListener('not-connected', onNotConnected);
      rs.removeEventListener('sync-started', onSyncStarted);
      rs.removeEventListener('sync-done', onSyncDone);
    };
  }, []);

  return { isSyncing, status, userAddress };
}

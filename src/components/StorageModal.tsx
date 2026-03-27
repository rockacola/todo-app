import { Button, Dialog, Field, Input, Link, Stack, Text } from '@chakra-ui/react';
import { useState } from 'react';

import type { StorageStatus } from '../hooks/useRemoteStorage';
import { rs } from '../lib/remoteStorage';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  status: StorageStatus;
}

export function StorageModal({ isOpen, onClose, status }: Props) {
  const [address, setAddress] = useState('');

  const handleConnect = () => {
    const trimmed = address.trim();
    if (!trimmed) return;
    rs.connect(trimmed);
    onClose();
  };

  const handleDisconnect = () => {
    rs.disconnect();
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleConnect();
  };

  return (
    <Dialog.Root
      onOpenChange={({ open }) => !open && onClose()}
      open={isOpen}
      size={{ base: 'full', md: 'sm' }}
    >
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content
          // Chakra quirk: size="full" sets minH to 100dvh and doesn't reset it at larger breakpoints
          minH={{ md: 'unset' }}
        >
          {status === 'connected' ? (
            <>
              <Dialog.Header>
                <Dialog.Title>Storage connected</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>
                <Stack gap={3}>
                  <Text color="gray.600" fontSize="sm">
                    Connected as{' '}
                    <Text as="span" color="gray.800" fontWeight="medium">
                      {rs.remote.userAddress}
                    </Text>
                    . Your tasks are syncing across devices.
                  </Text>
                </Stack>
              </Dialog.Body>
              <Dialog.Footer gap={2}>
                <Dialog.ActionTrigger asChild>
                  <Button onClick={onClose} variant="ghost">
                    Close
                  </Button>
                </Dialog.ActionTrigger>
                <Button colorScheme="red" onClick={handleDisconnect} variant="outline">
                  Disconnect
                </Button>
              </Dialog.Footer>
            </>
          ) : (
            <>
              <Dialog.Header>
                <Dialog.Title>Connect your storage</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>
                <Stack gap={4}>
                  <Text color="gray.600" fontSize="sm">
                    Enter your remoteStorage address to sync tasks across all your devices. Your
                    data is stored in your own account - not on our servers.
                  </Text>
                  <Field.Root>
                    <Field.Label>remoteStorage address</Field.Label>
                    <Input
                      autoFocus
                      onChange={(e) => setAddress(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="you@remotestorage.example.com"
                      value={address}
                    />
                    <Field.HelperText>
                      No account?{' '}
                      <Link
                        color="blue.500"
                        href="https://5apps.com/storage"
                        rel="noreferrer"
                        target="_blank"
                      >
                        Get one free at 5apps.com
                      </Link>
                    </Field.HelperText>
                  </Field.Root>
                </Stack>
              </Dialog.Body>
              <Dialog.Footer gap={2}>
                <Dialog.ActionTrigger asChild>
                  <Button onClick={onClose} variant="ghost">
                    Cancel
                  </Button>
                </Dialog.ActionTrigger>
                <Button colorScheme="blue" disabled={!address.trim()} onClick={handleConnect}>
                  Connect
                </Button>
              </Dialog.Footer>
            </>
          )}
          <Dialog.CloseTrigger />
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
}

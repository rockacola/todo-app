import { Button, Text } from '@chakra-ui/react';
import { Cloud } from 'lucide-react';

import type { StorageStatus } from '../hooks/useRemoteStorage';

interface Props {
  onClick: () => void;
  status: StorageStatus;
  userAddress: string | null;
}

export function StorageStatusIcon({ onClick, status, userAddress }: Props) {
  const isConnected = status === 'connected';

  return (
    <Button
      aria-label={isConnected ? 'Manage storage connection' : 'Connect to remote storage'}
      color={isConnected ? undefined : 'gray.400'}
      colorPalette={isConnected ? 'cyan' : 'gray'}
      minW="auto"
      mt={1}
      onClick={onClick}
      px={1.5}
      py={1}
      variant="ghost"
    >
      {isConnected ? (
        <>
          <Cloud fill="currentColor" size={22} strokeWidth={0} />
          {!!userAddress && (
            <Text
              fontSize="sm"
              maxW={48}
              overflow="hidden"
              textOverflow="ellipsis"
              whiteSpace="nowrap"
            >
              {userAddress}
            </Text>
          )}
        </>
      ) : (
        <>
          <Cloud fill="currentColor" size={22} strokeWidth={0} />
          <Text fontSize="sm">Sync</Text>
        </>
      )}
    </Button>
  );
}

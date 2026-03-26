import { Button } from '@chakra-ui/react';
import { Cloud, CloudOff } from 'lucide-react';
import type { StorageStatus } from '../hooks/useStorageStatus';

interface Props {
  onClick: () => void;
  status: StorageStatus;
}

export function StorageStatusIcon({ onClick, status }: Props) {
  const isConnected = status === 'connected';

  return (
    <Button
      _hover={{ color: isConnected ? 'green.600' : 'gray.500' }}
      aria-label={isConnected ? 'Manage storage connection' : 'Connect to remote storage'}
      color={isConnected ? 'green.500' : 'gray.300'}
      minW="auto"
      mt={1}
      px={1.5}
      py={1}
      variant="ghost"
      onClick={onClick}
    >
      {isConnected ? (
        <Cloud size={22} strokeWidth={1.75} />
      ) : (
        <CloudOff size={22} strokeWidth={1.75} />
      )}
    </Button>
  );
}

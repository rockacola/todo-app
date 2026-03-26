import { Box, Flex, Heading } from '@chakra-ui/react';

import type { StorageStatus } from '../hooks/useStorageStatus';

import { StorageStatusIcon } from './StorageStatusIcon';

interface Props {
  onConnect: () => void;
  storageStatus: StorageStatus;
}

export function PageHeader({ onConnect, storageStatus }: Props) {
  return (
    <Box>
      <Flex align="center" gap={3} justify="center">
        <Heading
          color="gray.800"
          fontFamily='"Abel", "Roboto", "Helvetica Neue", Arial, sans-serif'
          fontWeight="bold"
          size="2xl"
        >
          Tasks
        </Heading>
        <StorageStatusIcon onClick={onConnect} status={storageStatus} />
      </Flex>
    </Box>
  );
}

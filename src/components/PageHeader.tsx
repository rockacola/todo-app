import { Box, Flex, Heading, Spacer } from '@chakra-ui/react';

import type { StorageStatus } from '../hooks/useRemoteStorage';

import { StorageStatusIcon } from './StorageStatusIcon';

interface Props {
  onConnect: () => void;
  storageStatus: StorageStatus;
  userAddress: string | null;
}

export function PageHeader({ onConnect, storageStatus, userAddress }: Props) {
  return (
    <Box>
      <Flex align="center" gap={3}>
        <Heading
          color="gray.800"
          fontFamily='"Abel", "Roboto", "Helvetica Neue", Arial, sans-serif'
          fontWeight="bold"
          size="2xl"
        >
          Tasks
        </Heading>
        <Spacer />
        <StorageStatusIcon onClick={onConnect} status={storageStatus} userAddress={userAddress} />
      </Flex>
    </Box>
  );
}

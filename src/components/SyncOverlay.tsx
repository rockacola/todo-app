import { Box, Spinner } from '@chakra-ui/react';

interface Props {
  children: React.ReactNode;
  isSyncing: boolean;
}

export function SyncOverlay({ children, isSyncing }: Props) {
  return (
    <Box position="relative">
      {children}
      {!!isSyncing && (
        <Box
          alignItems="center"
          bg="gray.25"
          borderRadius="lg"
          display="flex"
          inset={0}
          justifyContent="center"
          opacity={0.85}
          position="absolute"
        >
          <Spinner color="blue.400" size="md" />
        </Box>
      )}
    </Box>
  );
}

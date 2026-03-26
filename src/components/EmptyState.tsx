import { Box, Text } from '@chakra-ui/react';

export function EmptyState() {
  return (
    <Box color="gray.400" py={12} textAlign="center">
      <Text fontSize="lg">No tasks yet</Text>
      <Text fontSize="sm" mt={1}>
        Add one to get started
      </Text>
    </Box>
  );
}

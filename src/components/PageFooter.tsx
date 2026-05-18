import { Text } from '@chakra-ui/react';

export function PageFooter() {
  return (
    <Text color="gray.400" fontSize="xs" mt={4} textAlign="center">
      v{__APP_VERSION__}
    </Text>
  );
}

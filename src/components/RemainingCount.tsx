import { Text } from '@chakra-ui/react';

interface Props {
  count: number;
}

export function RemainingCount({ count }: Props) {
  return (
    <Text color="gray.500" fontSize="sm" mt={1} visibility={count === 0 ? 'hidden' : 'visible'}>
      {count} remaining
    </Text>
  );
}

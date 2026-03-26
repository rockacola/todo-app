import { Button, Checkbox, Flex } from '@chakra-ui/react';

import type { TodoItem as TodoItemType } from '../lib/remoteStorage';

interface Props {
  onRemove: (id: string) => void;
  onToggle: (id: string) => void;
  todo: TodoItemType;
}

export function TodoItem({ onRemove, onToggle, todo }: Props) {
  return (
    <Flex
      _hover={{ borderColor: 'gray.300' }}
      align="center"
      bg="white"
      borderColor="gray.200"
      borderRadius="lg"
      borderWidth="1px"
      gap={3}
      px={3}
      py={1}
      transition="border-color 0.15s"
    >
      <Checkbox.Root
        checked={todo.done}
        flex={1}
        gap={3}
        minW={0}
        onCheckedChange={() => onToggle(todo.id)}
      >
        <Checkbox.HiddenInput />
        <Checkbox.Control
          bg={todo.done ? 'blue.500' : 'white'}
          borderColor="gray.300"
          flexShrink={0}
        />
        <Checkbox.Label
          color={todo.done ? 'gray.400' : 'gray.700'}
          cursor="pointer"
          flex={1}
          fontSize="md"
          minW={0}
          textDecoration={todo.done ? 'line-through' : 'none'}
          wordBreak="break-word"
        >
          {todo.text}
        </Checkbox.Label>
      </Checkbox.Root>
      <Button
        _hover={{ color: 'red.400', bg: 'red.50' }}
        aria-label="Remove task"
        color="gray.400"
        minW="auto"
        onClick={() => onRemove(todo.id)}
        px={2}
        size="sm"
        variant="ghost"
      >
        ✕
      </Button>
    </Flex>
  );
}

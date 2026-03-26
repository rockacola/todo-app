import { Button, Flex, Stack } from '@chakra-ui/react';
import { Trash2 } from 'lucide-react';
import { TodoItem } from './TodoItem';
import type { TodoItem as TodoItemType } from '../lib/remoteStorage';

interface Props {
  onClearCompleted: () => void;
  onRemove: (id: string) => void;
  onToggle: (id: string) => void;
  todos: TodoItemType[];
}

export function TodoList({ onClearCompleted, onRemove, onToggle, todos }: Props) {
  const hasCompleted = todos.some((t) => t.done);

  return (
    <Stack gap={2}>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onRemove={onRemove} onToggle={onToggle} />
      ))}
      {hasCompleted && (
        <Flex justify="flex-end" mt={2}>
          <Button
            _hover={{ color: 'gray.600' }}
            color="gray.400"
            size="sm"
            variant="ghost"
            onClick={onClearCompleted}
          >
            <Trash2 size={14} />
            Clear completed
          </Button>
        </Flex>
      )}
    </Stack>
  );
}

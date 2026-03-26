import { useState, useRef } from 'react';
import { Button, Flex, Input } from '@chakra-ui/react';
import { Plus } from 'lucide-react';

interface Props {
  onAdd: (text: string) => Promise<void>;
}

export function AddTodoForm({ onAdd }: Props) {
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleAdd = async () => {
    const text = value.trim();
    if (!text) return;
    setValue('');
    inputRef.current?.focus();
    await onAdd(text);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleAdd();
  };

  return (
    <Flex gap={2}>
      <Input
        ref={inputRef}
        _focus={{ borderColor: 'blue.400', boxShadow: 'none' }}
        bg="white"
        borderColor="gray.200"
        flex={1}
        placeholder="Add a task..."
        size="lg"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <Button colorScheme="blue" disabled={!value.trim()} px={4} size="lg" onClick={handleAdd}>
        <Plus size={20} />
      </Button>
    </Flex>
  );
}

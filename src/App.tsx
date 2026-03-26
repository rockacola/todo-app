import { useState } from 'react';
import { Box, Container, Stack } from '@chakra-ui/react';
import { useTodos } from './hooks/useTodos';
import { useStorageStatus } from './hooks/useStorageStatus';
import { AddTodoForm } from './components/AddTodoForm';
import { EmptyState } from './components/EmptyState';
import { PageHeader } from './components/PageHeader';
import { RemainingCount } from './components/RemainingCount';
import { StorageModal } from './components/StorageModal';
import { SyncOverlay } from './components/SyncOverlay';
import { TodoList } from './components/TodoList';

function App() {
  const { todos, addTodo, toggleTodo, removeTodo, clearCompleted } = useTodos();
  const { isSyncing, status: storageStatus } = useStorageStatus();
  const [isStorageModalOpen, setIsStorageModalOpen] = useState(false);

  const remaining = todos.filter((t) => !t.done).length;

  return (
    <Box bg="gray.100" minH="100vh" pb={{ base: 8, md: 16 }}>
      <Container
        bgColor="white"
        borderBottomLeftRadius="lg"
        borderBottomRightRadius="lg"
        maxW="sm"
        pb={6}
        pt={{ base: 8, md: 16 }}
        px={6}
      >
        <Stack gap={6}>
          <Box>
            <PageHeader
              storageStatus={storageStatus}
              onConnect={() => setIsStorageModalOpen(true)}
            />
            <RemainingCount count={remaining} />
          </Box>
          <AddTodoForm onAdd={addTodo} />
          <SyncOverlay isSyncing={isSyncing}>
            {todos.length === 0 ? (
              <EmptyState />
            ) : (
              <TodoList
                todos={todos}
                onClearCompleted={clearCompleted}
                onRemove={removeTodo}
                onToggle={toggleTodo}
              />
            )}
          </SyncOverlay>
        </Stack>
      </Container>
      <StorageModal
        isOpen={isStorageModalOpen}
        status={storageStatus}
        onClose={() => setIsStorageModalOpen(false)}
      />
    </Box>
  );
}

export default App;

import { Box, Container, Stack } from '@chakra-ui/react';
import { useState } from 'react';

import { AddTodoForm } from './components/AddTodoForm';
import { EmptyState } from './components/EmptyState';
import { PageHeader } from './components/PageHeader';
import { RemainingCount } from './components/RemainingCount';
import { StorageModal } from './components/StorageModal';
import { SyncOverlay } from './components/SyncOverlay';
import { TodoList } from './components/TodoList';
import { useRemoteStorage } from './hooks/useRemoteStorage';
import { useTodos } from './hooks/useTodos';

function App() {
  const { todos, addTodo, toggleTodo, removeTodo, clearCompleted } = useTodos();
  const { isSyncing, status: storageStatus, userAddress } = useRemoteStorage();
  const [isStorageModalOpen, setIsStorageModalOpen] = useState(false);

  const remaining = todos.filter((t) => !t.done).length;

  return (
    <Box
      background="linear-gradient(to bottom, {colors.gray.100} 80%, {colors.gray.200})"
      minH="100vh"
      pb={{ base: 8, md: 16 }}
    >
      <Container
        bgColor={{ base: 'transparent', md: 'white' }}
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
              onConnect={() => setIsStorageModalOpen(true)}
              storageStatus={storageStatus}
              userAddress={userAddress}
            />
            <RemainingCount count={remaining} />
          </Box>
          <AddTodoForm onAdd={addTodo} />
          <SyncOverlay isSyncing={isSyncing}>
            {todos.length === 0 ? (
              <EmptyState />
            ) : (
              <TodoList
                onClearCompleted={clearCompleted}
                onRemove={removeTodo}
                onToggle={toggleTodo}
                todos={todos}
              />
            )}
          </SyncOverlay>
        </Stack>
      </Container>
      <StorageModal
        isOpen={isStorageModalOpen}
        onClose={() => setIsStorageModalOpen(false)}
        status={storageStatus}
      />
    </Box>
  );
}

export default App;

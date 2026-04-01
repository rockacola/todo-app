// Mirrors the provider setup in main.tsx so every component test runs in the
// same context as the real app. When a new provider is added to main.tsx,
// add it here too.

import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { render } from '@testing-library/react';
import { StrictMode } from 'react';
import type { ReactElement } from 'react';

function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <StrictMode>
      <ChakraProvider value={defaultSystem}>{children}</ChakraProvider>
    </StrictMode>
  );
}

export function renderWithProviders(ui: ReactElement) {
  return render(ui, { wrapper: AppProviders });
}

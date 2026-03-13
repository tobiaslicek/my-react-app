import { ChakraProvider } from '@chakra-ui/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import './index.css';
import { AuthProvider } from './auth.tsx';
import { queryClient } from './queryClient.ts';
import { router } from './router.tsx';
import { theme } from './theme.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ChakraProvider value={theme}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </QueryClientProvider>
    </ChakraProvider>
  </StrictMode>,
);

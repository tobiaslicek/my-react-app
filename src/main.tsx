import { ChakraProvider } from '@chakra-ui/react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import './index.css';
import { router } from './router.tsx';
import { theme } from './theme.ts';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './queryClient.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ChakraProvider value={theme}>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      {/* <App /> */}
      </QueryClientProvider>
    </ChakraProvider>
  </StrictMode>,
);

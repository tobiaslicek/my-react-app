import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      retryOnMount: false,
      staleTime: 30 * 1000, // 1 min
    },
    mutations: {
      retry: false,
      onError: (error) => {
        console.log(error)
      },
    },
  },
});
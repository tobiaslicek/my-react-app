import { defineConfig } from 'orval';

const orvalConfig = defineConfig({
  backend: {
    input: {
      target: './src/api/openapi.json',
      parserOptions: {
        validate: false,
      },
    },
    output: {
      mode: 'single' as const,
      prettier: true,
      client: 'react-query',
      target: './src/api/api.ts',
      override: {
        mutator: {
          path: './src/api/client.ts',
          name: 'kyMutator',
        },
      },
    },
  },
});

export default orvalConfig;
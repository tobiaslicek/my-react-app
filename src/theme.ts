import { createSystem, defaultConfig } from '@chakra-ui/react';

const config = {
  ...defaultConfig,
  initialColorMode: 'light',
  useSystemColorMode: false,
};

export const theme = createSystem(config);

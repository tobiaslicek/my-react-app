import { Box, Flex, Text } from '@chakra-ui/react';

export const Footer = () => {
  return (
    <Box bg="gray.900" color="gray.400" py={4} px={6}>
      <Flex justify="center" align="center">
        <Text fontSize="sm">
          © {new Date().getFullYear()} MyApp. All rights reserved.
        </Text>
      </Flex>
    </Box>
  );
};

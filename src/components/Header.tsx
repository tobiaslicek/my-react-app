import { Box, Button, Flex, Spacer, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../constants';

export const Header = () => {
  const navigate = useNavigate();

  return (
    <Box bg="gray.800" px={6} py={4}>
      <Flex align="center">
        {/* Logo / název */}
        <Text fontSize="lg" fontWeight="bold" color="white">
          MyApp
        </Text>

        <Spacer />

        {/* Menu */}
        <Flex gap={4}>
          <Button
            variant="ghost"
            color="white"
            onClick={() => navigate(ROUTES.main)}
          >
            Home
          </Button>
          <Button variant="ghost" color="white">
            About
          </Button>
          <Button colorScheme="blue">Login</Button>
        </Flex>
      </Flex>
    </Box>
  );
};

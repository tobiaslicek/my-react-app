import {
  Box,
  Button,
  Flex,
  Heading,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../constants';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Flex
      minH="60vh"
      align="center"
      justify="center"
      direction="column"
    >
      <Stack gap={6} textAlign="center" maxW="600px" px={4}>
        {/* 404 Number */}
        <Heading
          size="4xl"
          color="gray.400"
          fontWeight="bold"
          lineHeight="1"
        >
          404
        </Heading>

        {/* Main Message */}
        <Stack gap={3}>
          <Heading size="xl" color="gray.800">
            Stránka nenalezena
          </Heading>
          <Text fontSize="lg" color="gray.600" maxW="md">
            Omlouváme se, ale stránka, kterou hledáte, neexistuje nebo byla
            přesunuta.
          </Text>
        </Stack>

        {/* Action Buttons */}
        <Flex gap={4} mt={4} flexWrap="wrap" justify="center">
          <Button
            colorScheme="blue"
            size="lg"
            onClick={() => navigate(ROUTES.todos)}
          >
            Zpět na Todo
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => navigate(ROUTES.main)}
          >
            Domů
          </Button>
        </Flex>

        {/* Decorative Box */}
        <Box
          mt={8}
          p={6}
          bg="gray.50"
          borderRadius="lg"
          border="1px solid"
          borderColor="gray.200"
          maxW="md"
        >
          <Text fontSize="sm" color="gray.500">
            💡 Tip: Zkontrolujte prosím URL adresu nebo použijte navigaci v
            hlavičce.
          </Text>
        </Box>
      </Stack>
    </Flex>
  );
};

export default NotFound;

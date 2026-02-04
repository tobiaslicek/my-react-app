import {
  Badge,
  Box,
  Button,
  Card,
  Flex,
  Heading,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import { ROUTES } from '../constants';
import type { TTodoItem } from '../../types';

// Mock data - stejné jako v Todos.tsx
// Později se nahradí daty z API
const MOCK_DATA: TTodoItem[] = [
  {
    title: 'Dojít na nákup',
    description: 'Test descr',
    id: '2',
    isChecked: true,
  },
  {
    title: 'Zaplatit nájem',
    description: 'Test descr 2',
    id: '3',
    isChecked: false,
  },
];

const TodoDetail = () => {
  const params = useParams();
  const navigate = useNavigate();

  // Najdeme todo item podle id
  const todo = MOCK_DATA.find((item) => item.id === params.id);

  // Pokud todo neexistuje, zobrazíme zprávu
  if (!todo) {
    return (
      <Flex
        minH="60vh"
        align="center"
        justify="center"
        direction="column"
      >
        <Stack gap={4}>
          <Heading size="xl" color="gray.800">
            Todo nenalezeno
          </Heading>
          <Text color="gray.600">
            Todo s ID "{params.id}" neexistuje.
          </Text>
          <Button
            colorScheme="blue"
            onClick={() => navigate(ROUTES.todos)}
          >
            Zpět na seznam Todo
          </Button>
        </Stack>
      </Flex>
    );
  }

  return (
    <Box maxW="800px" mx="auto" w="100%">
      <Stack gap={6} align="stretch">
        {/* Back Button */}
        <Button
          variant="ghost"
          alignSelf="flex-start"
          onClick={() => navigate(ROUTES.todos)}
        >
          ← Zpět na seznam
        </Button>

        {/* Todo Detail Card */}
        <Card.Root size="lg">
          <Card.Header>
            <Flex align="center" justify="space-between" flexWrap="wrap" gap={4}>
              <Stack gap={2} align="flex-start">
                <Heading size="2xl" color="gray.800">
                  {todo.title}
                </Heading>
                <Badge
                  colorScheme={todo.isChecked ? 'green' : 'orange'}
                  fontSize="sm"
                  px={3}
                  py={1}
                  borderRadius="full"
                >
                  {todo.isChecked ? '✓ Hotovo' : '⏳ V průběhu'}
                </Badge>
              </Stack>
            </Flex>
          </Card.Header>

          <Card.Body>
            <Stack gap={4} align="stretch">
              {/* Description */}
              <Box>
                <Text
                  fontSize="sm"
                  fontWeight="semibold"
                  color="gray.600"
                  mb={2}
                  textTransform="uppercase"
                  letterSpacing="wide"
                >
                  Popis
                </Text>
                <Text fontSize="lg" color="gray.700" lineHeight="tall">
                  {todo.description || 'Žádný popis není k dispozici.'}
                </Text>
              </Box>

              {/* ID Info */}
              <Box
                p={4}
                bg="gray.50"
                borderRadius="md"
                border="1px solid"
                borderColor="gray.200"
              >
                <Text fontSize="sm" color="gray.500">
                  <Text as="span" fontWeight="semibold">
                    ID:
                  </Text>{' '}
                  {todo.id}
                </Text>
              </Box>
            </Stack>
          </Card.Body>
        </Card.Root>

        {/* Action Buttons */}
        <Flex gap={4} justify="flex-end" flexWrap="wrap">
          <Button
            variant="outline"
            onClick={() => navigate(ROUTES.todos)}
          >
            Zpět na seznam
          </Button>
          <Button colorScheme="blue">
            Upravit Todo
          </Button>
        </Flex>
      </Stack>
    </Box>
  );
};

export default TodoDetail;

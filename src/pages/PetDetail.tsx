import {
  Badge,
  Box,
  Button,
  Card,
  Flex,
  Heading,
  Spinner,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetPetById } from '../api/api';
import { ROUTES } from '../constants';

export const PetDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const petId = Number(id);
  const isValidId = id != null && !Number.isNaN(petId);

  const { data: pet, isFetching, isError } = useGetPetById(petId, {
    query: { enabled: isValidId },
  });
  console.log(pet);
  if (!isValidId) {
    return (
      <Flex minH="60vh" align="center" justify="center" direction="column">
        <Stack gap={4}>
          <Heading size="xl" color="gray.800">
            Neplatné ID mazlíčka
          </Heading>
          <Button colorScheme="blue" onClick={() => navigate(ROUTES.petList)}>
            Zpět na seznam
          </Button>
        </Stack>
      </Flex>
    );
  }

  if (isFetching) {
    return (
      <Flex minH="40vh" align="center" justify="center">
        <Spinner />
      </Flex>
    );
  }

  if (isError || !pet) {
    return (
      <Flex minH="60vh" align="center" justify="center" direction="column">
        <Stack gap={4}>
          <Heading size="xl" color="gray.800">
            Mazlíček nenalezen
          </Heading>
          <Text color="gray.600">Pet s ID &quot;{id}&quot; neexistuje.</Text>
          <Button colorScheme="blue" onClick={() => navigate(ROUTES.petList)}>
            Zpět na seznam
          </Button>
        </Stack>
      </Flex>
    );
  }

  return (
    <Box maxW="800px" mx="auto" w="100%">
      <Stack gap={6} align="stretch">
        <Button
          variant="ghost"
          alignSelf="flex-start"
          onClick={() => navigate(ROUTES.petList)}
        >
          ← Zpět na seznam
        </Button>

        <Card.Root size="lg">
          <Card.Header>
            <Flex align="center" justify="space-between" flexWrap="wrap" gap={4}>
              <Stack gap={2} align="flex-start">
                <Heading size="2xl" color="gray.800">
                  {pet.name}
                </Heading>
                <Flex gap={2} flexWrap="wrap">
                  {pet.status != null && (
                    <Badge
                      colorScheme={
                        pet.status === 'available'
                          ? 'green'
                          : pet.status === 'sold'
                            ? 'gray'
                            : 'orange'
                      }
                      fontSize="sm"
                      px={3}
                      py={1}
                      borderRadius="full"
                    >
                      {pet.status}
                    </Badge>
                  )}
                  {pet.category?.name && (
                    <Badge colorScheme="blue" fontSize="sm" px={3} py={1}>
                      {pet.category.name}
                    </Badge>
                  )}
                </Flex>
              </Stack>
            </Flex>
          </Card.Header>

          <Card.Body>
            <Stack gap={4} align="stretch">
              {pet.id != null && (
                <Box>
                  <Text
                    fontSize="sm"
                    fontWeight="semibold"
                    color="gray.600"
                    mb={1}
                    textTransform="uppercase"
                    letterSpacing="wide"
                  >
                    ID
                  </Text>
                  <Text fontSize="lg" color="gray.800">
                    {pet.id}
                  </Text>
                </Box>
              )}

              {pet.category != null && (
                <Box>
                  <Text
                    fontSize="sm"
                    fontWeight="semibold"
                    color="gray.600"
                    mb={1}
                    textTransform="uppercase"
                    letterSpacing="wide"
                  >
                    Kategorie
                  </Text>
                  <Text fontSize="lg" color="gray.800">
                    {pet.category.name ?? '—'}
                  </Text>
                </Box>
              )}

              {pet.tags != null && pet.tags.length > 0 && (
                <Box>
                  <Text
                    fontSize="sm"
                    fontWeight="semibold"
                    color="gray.600"
                    mb={2}
                    textTransform="uppercase"
                    letterSpacing="wide"
                  >
                    Tagy
                  </Text>
                  <Flex gap={2} flexWrap="wrap">
                    {pet.tags.map((tag) => (
                      <Badge
                        key={tag.id ?? tag.name ?? Math.random()}
                        variant="outline"
                        colorScheme="gray"
                        fontSize="sm"
                        px={2}
                        py={1}
                      >
                        {tag.name ?? '—'}
                      </Badge>
                    ))}
                  </Flex>
                </Box>
              )}

              {pet.photoUrls != null && pet.photoUrls.length > 0 && (
                <Box>
                  <Text
                    fontSize="sm"
                    fontWeight="semibold"
                    color="gray.600"
                    mb={2}
                    textTransform="uppercase"
                    letterSpacing="wide"
                  >
                    Fotky (URL)
                  </Text>
                  <Stack gap={1}>
                    {pet.photoUrls.map((url, index) => (
                      <a
                        key={index}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ fontSize: '0.875rem', color: '#3182CE' }}
                      >
                        {url}
                      </a>
                    ))}
                  </Stack>
                </Box>
              )}
            </Stack>
          </Card.Body>
        </Card.Root>
      </Stack>
    </Box>
  );
};

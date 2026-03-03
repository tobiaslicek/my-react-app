import { Badge, Button, Card, Flex, Heading, Stack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import type { Pet } from '../api/api';
import { ROUTES } from '../constants';

type Props = {
  pet: Pet;
};

export const PetItem = ({ pet }: Props) => {
  const navigate = useNavigate();

  const goToDetail = () => {
    if (pet.id == null) return;
    navigate(ROUTES.petDetail.replace(':id', String(pet.id)));
  };

  return (
    <Card.Root size="sm">
      <Card.Body>
        <Stack gap={3}>
          <Flex align="center" justify="space-between" flexWrap="wrap" gap={2}>
            <Heading size="md">{pet.name}</Heading>
            {pet.category?.name && (
              <Badge colorScheme="blue" fontSize="sm" px={2} py={1}>
                {pet.category.name}
              </Badge>
            )}
          </Flex>

          <Badge variant="outline" colorScheme="gray" fontSize="xs" px={2} py={1}>
            {pet.status ?? '—'}
          </Badge>

          {pet.id != null && (
            <Button size="sm" colorScheme="blue" onClick={goToDetail}>
              Detail
            </Button>
          )}
        </Stack>
      </Card.Body>
    </Card.Root>
  );
};

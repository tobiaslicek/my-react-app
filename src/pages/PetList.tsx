import {
  Box,
  Heading,
  RadioGroup,
  Spinner,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useState } from 'react';
import type { FindPetsByStatusStatusItem } from '../api/api';
import { useFindPetsByStatus } from '../api/api';
import { PetItem } from '../components/PetItem';

const STATUS_OPTIONS: { value: FindPetsByStatusStatusItem; label: string }[] = [
  { value: 'available', label: 'Dostupná' },
  { value: 'pending', label: 'Čekající' },
  { value: 'sold', label: 'Prodaná' },
];

export const PetList = () => {
  const [status, setStatus] = useState<FindPetsByStatusStatusItem>('available');
  const { data, isFetching } = useFindPetsByStatus({ status: [status] });

  return (
    <Box>
      <Heading size="lg" mb={4}>
        Mazlíčci
      </Heading>

      <RadioGroup.Root
        value={status}
        onValueChange={(e) => setStatus(e.value as FindPetsByStatusStatusItem)}
        mb={6}
      >
        <Stack gap={2} direction="row" flexWrap="wrap">
          {STATUS_OPTIONS.map((opt) => (
            <RadioGroup.Item key={opt.value} value={opt.value}>
              <RadioGroup.ItemHiddenInput />
              <RadioGroup.ItemIndicator />
              <RadioGroup.ItemText>
                <Text as="span" ml={2}>
                  {opt.label}
                </Text>
              </RadioGroup.ItemText>
            </RadioGroup.Item>
          ))}
        </Stack>
      </RadioGroup.Root>

      {isFetching && <Spinner />}
      {!isFetching && (!data || !data.length) && (
        <Text color="gray.600">Pro zvolený stav nejsou žádná zvířata.</Text>
      )}
      {!isFetching && data && data.length > 0 && (
        <Stack gap={3}>
          {data.map((pet) => (
            <PetItem key={pet.id ?? pet.name} pet={pet} />
          ))}
        </Stack>
      )}
    </Box>
  );
};
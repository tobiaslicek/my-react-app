import {
  Button,
  Card,
  CardBody,
  Field,
  Heading,
  Input,
  Stack,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import z from 'zod';
import type { TTodoItem } from '../../types';
type Props = { onAddTodo: (item: TTodoItem) => void };

type TAddTodoForm = { name: string; description: string };

const DEFAULT_VALUES = { name: '', description: '' };

const todoSchema = z.object({
  name: z.string().min(1, 'Name je povinný'),
  description: z.string().min(1, 'Popis je povinný'),
});

export const AddTodoForm = ({ onAddTodo }: Props) => {
  // const [name, setName] = useState('');
  // const [description, setDescription] = useState('');
  // const descriptionRef = useRef();
  useEffect(() => {
    console.log('Hello');
  }, []);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<TAddTodoForm>({
    defaultValues: DEFAULT_VALUES,
    resolver: zodResolver(todoSchema),
  });

  const values = watch();

  const onSubmit = (formValues: TAddTodoForm) => {
    console.log(formValues.name);
    console.log(formValues.description);
    const newTodo = {
      id: uuidv4(),
      title: formValues.name,
      isChecked: false,
      description: formValues.description,
    };
    onAddTodo(newTodo);
    // setName('');
    // setDescription('');
    reset();
    console.log(newTodo);
    // descriptionRef.current = 'Ahoj';
    // console.log(descriptionRef.current);};
  };

  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <Card.Root size="sm" mb={6}>
        <CardBody>
          <Stack gap={4}>
            <Heading size="md">Add todo</Heading>

            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <Field.Root invalid={!!errors.name}>
                  <Input
                    placeholder="Název"
                    variant="subtle"
                    value={value}
                    onChange={onChange}
                  />
                  {errors.name && (
                    <Field.ErrorText>{errors.name.message}</Field.ErrorText>
                  )}
                </Field.Root>
              )}
              name="name"
            />

            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="Popis"
                  variant="subtle"
                  value={value}
                  onChange={onChange}
                />
              )}
              name="description"
            />

            <Button onClick={handleSubmit(onSubmit)} colorPalette="black">
              Přidej {values.name} {values.description}
            </Button>
          </Stack>
        </CardBody>
      </Card.Root>
    </form>
  );
};

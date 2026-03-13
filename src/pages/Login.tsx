import {
  Box,
  Button,
  Card,
  Heading,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import z from 'zod';
import { loginUser, type LoginUserParams } from '../api/api';
import type { LoginResponse } from '../auth';
import { useAuth } from '../auth';
import { ROUTES } from '../constants';
import { FormInput } from '../components/FormInput';

const loginSchema = z.object({
  username: z.string().min(1, 'Uživatelské jméno je povinné'),
  password: z.string().min(1, 'Heslo je povinné'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const defaultValues: LoginFormValues = {
  username: '',
  password: '',
};

const Login = () => {
  const navigate = useNavigate();
  const { isAuthenticated, login } = useAuth();

  const {
    control,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<LoginFormValues>({
    defaultValues,
    resolver: zodResolver(loginSchema),
  });

  const mutation = useMutation({
    mutationFn: (params: LoginUserParams) => loginUser(params),
    onSuccess: (data) => {
      const response: LoginResponse =
        typeof data === 'string'
          ? { isAuthenticated: true, token: data }
          : (data as LoginResponse);
      login(response);
      if (response.message) {
        alert('1');
        navigate(ROUTES.main);
      }
    },
    onError: () => {
      setError('root', {
        type: 'manual',
        message: 'Přihlášení se nezdařilo. Zkontrolujte údaje.',
      });
    },
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate(ROUTES.main);
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = (values: LoginFormValues) => {
    clearErrors('root');
    mutation.mutate({
      username: values.username,
      password: values.password,
    });
  };

  return (
    <Box maxW="md" mx="auto" mt={12} px={4}>
      <Card.Root>
        <Card.Header>
          <Heading size="xl">Přihlášení</Heading>
          <Text mt={2} color="gray.600">
            Zadejte přihlašovací údaje.
          </Text>
        </Card.Header>
        <Card.Body>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Stack gap={4}>
              {errors.root && (
                <Text color="red.500" fontSize="sm">
                  {errors.root.message}
                </Text>
              )}
              <FormInput
                name="username"
                control={control}
                title="Uživatelské jméno"
                type="text"
                placeholder="např. jan"
                autoComplete="username"
              />
              <FormInput
                name="password"
                control={control}
                title="Heslo"
                type="password"
                placeholder="••••••••"
                autoComplete="current-password"
              />
              <Button
                type="submit"
                colorScheme="blue"
                width="full"
                loading={mutation.isPending}
                loadingText="Přihlašuji…"
              >
                Přihlásit se
              </Button>
            </Stack>
          </form>
        </Card.Body>
      </Card.Root>
    </Box>
  );
};

export default Login;

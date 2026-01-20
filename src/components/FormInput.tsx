import { Field, Input, type InputProps } from '@chakra-ui/react';
import type { ChangeEvent } from 'react';
import {
  type FieldValues,
  useController,
  type UseControllerProps,
} from 'react-hook-form';

type TFormInputProps<TFieldValues extends FieldValues> =
  UseControllerProps<TFieldValues> &
    Omit<
      InputProps,
      'name' | 'onBlur' | 'value' | 'ref' | 'disabled' | 'format'
    > & { isDisabled?: boolean };

export function FormInput<TFieldValues extends FieldValues>({
  name,
  control,
  defaultValue,
  rules,
  shouldUnregister,
  isDisabled = false,
  onChange,
  title,
  ...inputProps
}: TFormInputProps<TFieldValues>) {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue,
    rules,
    shouldUnregister,
  });

  return (
    <Field.Root invalid={!!error}>
      <Field.Label>{title}</Field.Label>
      <Input
        disabled={isDisabled}
        variant="subtle"
        {...field}
        {...inputProps}
        onChange={(e) => {
          field.onChange(e);
          onChange?.(e as ChangeEvent<HTMLInputElement> & string);
        }}
      />
      {error?.message && <Field.ErrorText>{error.message}</Field.ErrorText>}
    </Field.Root>
  );
}

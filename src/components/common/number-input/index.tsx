import { FieldPath, FieldValues } from 'react-hook-form';
import MyInput, { MyInputProps } from '../my-input';
import NumberFormatInput from './NumberFormatInput';

export type NumberInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = MyInputProps<TFieldValues, TName>;

function NumberInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ InputProps, ...props }: NumberInputProps<TFieldValues, TName>) {
  return (
    <MyInput
      {...props}
      InputProps={{ ...InputProps, inputComponent: NumberFormatInput as any }}
    />
  );
}

export default NumberInput;

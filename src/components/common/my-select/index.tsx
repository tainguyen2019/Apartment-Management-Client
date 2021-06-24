import { MenuItem } from '@material-ui/core';
import { FieldPath, FieldValues } from 'react-hook-form';
import MyInput, { MyInputProps } from '../my-input/index';

export interface MySelectOption {
  value: string | number;
  label: React.ReactNode;
}

export interface MySelectProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends MyInputProps<TFieldValues, TName> {
  options: MySelectOption[];
}

function MySelect<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ options, ...myInputProps }: MySelectProps<TFieldValues, TName>) {
  return (
    <MyInput select {...myInputProps}>
      {options.map(({ value, label }) => (
        <MenuItem key={value} value={value}>
          {label}
        </MenuItem>
      ))}
    </MyInput>
  );
}

export default MySelect;

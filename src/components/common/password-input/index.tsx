import { useState, useCallback, useMemo } from 'react';
import { IconButton } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import MyInput, { MyInputProps } from '../my-input';
import { FieldPath, FieldValues } from 'react-hook-form';

export type PasswordInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = MyInputProps<TFieldValues, TName>;

function PasswordInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  type: defaultType = 'password',
  InputProps,
  ...props
}: PasswordInputProps<TFieldValues, TName>) {
  const [type, setType] = useState(defaultType);
  const handleToggle = useCallback(() => {
    setType((prev) => {
      if (prev === 'password') return 'text';
      return 'password';
    });
  }, []);
  const icon = useMemo(() => {
    if (type === 'password') return <Visibility />;
    return <VisibilityOff />;
  }, [type]);

  return (
    <MyInput
      {...props}
      type={type}
      InputProps={{
        ...InputProps,
        endAdornment: <IconButton onClick={handleToggle}>{icon}</IconButton>,
      }}
    />
  );
}

export default PasswordInput;

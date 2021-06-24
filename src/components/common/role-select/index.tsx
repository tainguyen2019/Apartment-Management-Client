import React, { useMemo } from 'react';
import { CircularProgress } from '@material-ui/core';
import { FieldValues, FieldPath } from 'react-hook-form';

import useEffectOnce from 'hooks/useEffectOnce';
import useShallowEqualSelector from 'hooks/useShallowEqualSelector';
import useActions from 'hooks/useActions';
import { selectRoleState } from 'selectors/role';
import * as actionCreators from 'redux/role/actionCreators';

import MySelect, { MySelectProps, MySelectOption } from '../my-select';

interface RoleSelectProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends OmitFrom<MySelectProps<TFieldValues, TName>, 'options'> {
  usingDefaultOption?: boolean;
}

const defaultOption: MySelectOption = {
  label: 'Tất cả',
  value: 'Tất cả',
};

function RoleSelect<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  usingDefaultOption = false,
  InputProps,
  SelectProps,
  ...props
}: RoleSelectProps<TFieldValues, TName>) {
  const [getAllRoles] = useActions(actionCreators.getAllRoles);
  const { loading, roles } = useShallowEqualSelector(selectRoleState);

  const endAdornment = useMemo(
    () => (loading ? <CircularProgress color="inherit" size={20} /> : null),
    [loading],
  );

  const defaultOptions: MySelectOption[] = useMemo(
    () => (usingDefaultOption ? [defaultOption] : []),
    [usingDefaultOption],
  );

  const selectOptions = roles.reduce(
    (prev, { id, name }) => [
      ...prev,
      {
        label: name,
        value: id,
      },
    ],
    defaultOptions,
  );

  useEffectOnce(() => {
    getAllRoles();
  });

  return (
    <MySelect
      {...props}
      options={selectOptions}
      InputProps={{
        ...InputProps,
        endAdornment,
      }}
      SelectProps={{
        MenuProps: {
          style: {
            maxHeight: 400,
          },
        },
        ...SelectProps,
      }}
    />
  );
}

export default RoleSelect;

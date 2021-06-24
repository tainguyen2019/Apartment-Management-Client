import React, { useMemo } from 'react';
import { CircularProgress } from '@material-ui/core';
import { FieldValues, FieldPath } from 'react-hook-form';

import useEffectOnce from 'hooks/useEffectOnce';
import useShallowEqualSelector from 'hooks/useShallowEqualSelector';
import useActions from 'hooks/useActions';
import { selectDepartmentState } from 'selectors/department';
import * as actionCreators from 'redux/department/actionCreators';

import MySelect, { MySelectProps, MySelectOption } from '../my-select';

interface DepartmentSelectProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends OmitFrom<MySelectProps<TFieldValues, TName>, 'options'> {
  usingDefaultOption?: boolean;
}

const defaultOption: MySelectOption = {
  label: 'Tất cả',
  value: 'Tất cả',
};

function DepartmentSelect<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  usingDefaultOption = false,
  InputProps,
  ...props
}: DepartmentSelectProps<TFieldValues, TName>) {
  const [getDepartments] = useActions(actionCreators.getDepartments);
  const { loading, departments } = useShallowEqualSelector(
    selectDepartmentState,
  );

  const endAdornment = useMemo(
    () => (loading ? <CircularProgress color="inherit" size={20} /> : null),
    [loading],
  );

  const defaultOptions: MySelectOption[] = useMemo(
    () => (usingDefaultOption ? [defaultOption] : []),
    [usingDefaultOption],
  );

  const selectOptions = departments.reduce(
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
    getDepartments();
  });

  return (
    <MySelect
      {...props}
      options={selectOptions}
      InputProps={{
        ...InputProps,
        endAdornment,
      }}
    />
  );
}

export default DepartmentSelect;

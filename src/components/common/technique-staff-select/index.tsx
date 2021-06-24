import React, { useMemo } from 'react';
import { CircularProgress } from '@material-ui/core';
import { FieldValues, FieldPath } from 'react-hook-form';

import useEffectOnce from 'hooks/useEffectOnce';
import useShallowEqualSelector from 'hooks/useShallowEqualSelector';
import useActions from 'hooks/useActions';
import { selectTechniqueStaffState } from 'selectors/techniqueStaff';
import * as actionCreators from 'redux/technique-staff/actionCreators';

import MySelect, { MySelectProps, MySelectOption } from '../my-select';

interface TechniqueStaffSelectProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends OmitFrom<MySelectProps<TFieldValues, TName>, 'options'> {
  usingDefaultOption?: boolean;
}

const defaultOption: MySelectOption = {
  label: 'Tất cả',
  value: 'Tất cả',
};

function TechniqueStaffSelect<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  usingDefaultOption = false,
  InputProps,
  ...props
}: TechniqueStaffSelectProps<TFieldValues, TName>) {
  const [getStaffSelectOptions] = useActions(
    actionCreators.getStaffSelectOptions,
  );
  const { loading, staffs } = useShallowEqualSelector(
    selectTechniqueStaffState,
  );

  const endAdornment = useMemo(
    () => (loading ? <CircularProgress color="inherit" size={20} /> : null),
    [loading],
  );

  const defaultOptions: MySelectOption[] = useMemo(
    () => (usingDefaultOption ? [defaultOption] : []),
    [usingDefaultOption],
  );

  const selectOptions = staffs.reduce(
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
    getStaffSelectOptions();
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

export default TechniqueStaffSelect;

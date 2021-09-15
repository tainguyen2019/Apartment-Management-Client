import React, { useMemo } from 'react';
import { CircularProgress } from '@material-ui/core';
import { FieldValues, FieldPath } from 'react-hook-form';

import useEffectOnce from 'hooks/useEffectOnce';
import useShallowEqualSelector from 'hooks/useShallowEqualSelector';
import useActions from 'hooks/useActions';
import { selectAreaState } from 'selectors/area';
import * as actionCreators from 'redux/area/actionCreators';

import MySelect, { MySelectProps, MySelectOption } from '../my-select';

export interface AreaSelectProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends OmitFrom<MySelectProps<TFieldValues, TName>, 'options'> {
  usingDefaultOption?: boolean;
}

export const DEFAULT_OPTION: MySelectOption = {
  label: 'Tất cả',
  value: 'Tất cả',
};

function AreaSelect<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  usingDefaultOption = false,
  InputProps,
  ...props
}: AreaSelectProps<TFieldValues, TName>) {
  const [getAreas] = useActions(actionCreators.getAreas);
  const { loading, areas } = useShallowEqualSelector(selectAreaState);

  const endAdornment = useMemo(
    () =>
      loading ? (
        <CircularProgress
          data-testid="loading_indicator"
          color="inherit"
          size={20}
        />
      ) : null,
    [loading],
  );

  const defaultOptions: MySelectOption[] = useMemo(
    () => (usingDefaultOption ? [DEFAULT_OPTION] : []),
    [usingDefaultOption],
  );

  const selectOptions = areas.reduce(
    (prev, { id, building, location }) => [
      ...prev,
      {
        label: `${building} - ${location}`,
        value: id,
      },
    ],
    defaultOptions,
  );

  useEffectOnce(() => {
    getAreas();
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

export default AreaSelect;

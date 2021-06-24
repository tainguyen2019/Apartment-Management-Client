import React, { useMemo } from 'react';
import { CircularProgress } from '@material-ui/core';
import { FieldValues, FieldPath } from 'react-hook-form';

import useEffectOnce from 'hooks/useEffectOnce';
import useShallowEqualSelector from 'hooks/useShallowEqualSelector';
import useActions from 'hooks/useActions';
import { selectDeviceState } from 'selectors/device';
import * as actionCreators from 'redux/device/actionCreators';

import MySelect, { MySelectProps, MySelectOption } from '../my-select';

interface DeviceSelectProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends OmitFrom<MySelectProps<TFieldValues, TName>, 'options'> {
  usingDefaultOption?: boolean;
}

const defaultOption: MySelectOption = {
  label: 'Tất cả',
  value: 'Tất cả',
};

function DeviceSelect<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  usingDefaultOption = false,
  InputProps,
  ...props
}: DeviceSelectProps<TFieldValues, TName>) {
  const [getDevices] = useActions(actionCreators.getDevices);
  const { loading, devices } = useShallowEqualSelector(selectDeviceState);

  const endAdornment = useMemo(
    () => (loading ? <CircularProgress color="inherit" size={20} /> : null),
    [loading],
  );

  const defaultOptions: MySelectOption[] = useMemo(
    () => (usingDefaultOption ? [defaultOption] : []),
    [usingDefaultOption],
  );

  const selectOptions = devices.reduce(
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
    getDevices();
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

export default DeviceSelect;

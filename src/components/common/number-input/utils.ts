import { useCallback } from 'react';
import { NumberFormatValues } from 'react-number-format';
import { ValueTargetEvent } from 'types/common';

export const useHandleChangeNumberFormat = ({
  onChange,
}: {
  onChange: (event: ValueTargetEvent) => void;
}) =>
  useCallback(
    (values: NumberFormatValues) =>
      onChange({ target: { value: values.value } }),
    [onChange],
  );

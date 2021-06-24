import React, { FC, memo } from 'react';
import NumberFormat, { NumberFormatProps } from 'react-number-format';
import { ValueTargetEvent } from 'types/common';
import { useHandleChangeNumberFormat } from './utils';

export const NumberFormatInputComponent: FC<CustomNumberFormatProps> = ({
  onChange,
  inputRef,
  ...props
}) => {
  const handleChange = useHandleChangeNumberFormat({ onChange });

  return (
    <NumberFormat
      {...props}
      allowLeadingZeros
      isNumericString
      thousandSeparator
      allowNegative={false}
      decimalScale={0}
      getInputRef={inputRef}
      onValueChange={handleChange}
    />
  );
};

const NumberFormatInput = memo(NumberFormatInputComponent);
NumberFormatInput.displayName = 'NumberFormatInput';
export default NumberFormatInput;

export interface CustomNumberFormatProps
  extends OmitFrom<NumberFormatProps, 'getInputRef' | 'onChange'> {
  inputRef: (instance: NumberFormat | null) => void;
  onChange: (event: ValueTargetEvent) => void;
}

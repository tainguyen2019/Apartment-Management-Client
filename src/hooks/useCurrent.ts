import { useRef } from 'react';
import { ValueFactory } from 'types/common';

const useCurrent = <TValue>(initialValue?: ValueFactory<TValue>) => {
  const ref = useRef(initialValue);

  return {
    set: (value: TValue) => {
      ref.current = value;
    },
    get: () => ref.current,
    is: (value: TValue) => ref.current === value,
  } as const;
};

export default useCurrent;

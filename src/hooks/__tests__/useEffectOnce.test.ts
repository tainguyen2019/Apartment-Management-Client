import { EffectCallback } from 'react';
import { renderHook } from '@testing-library/react-hooks';
import useEffectOnce from '../useEffectOnce';

const setupTest = (effect: EffectCallback) => {
  return renderHook(() => useEffectOnce(effect));
};

describe('useEffectOnce', () => {
  it('should call effect only once', () => {
    const mockEffect = jest.fn();
    const { rerender } = setupTest(mockEffect);

    expect(mockEffect).toBeCalledTimes(1);

    rerender();

    expect(mockEffect).toBeCalledTimes(1);
  });
});

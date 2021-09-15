import { renderHook } from '@testing-library/react-hooks';
import useWillUnmount from '../useWillUnmount';

const setupTest = (callback: VoidFunction) => {
  return renderHook(() => useWillUnmount(callback));
};

describe('useWillUnmount', () => {
  it('should call callback on unmounting', () => {
    const mockCallback = jest.fn();
    const { unmount } = setupTest(mockCallback);

    expect(mockCallback).not.toBeCalled();

    unmount();

    expect(mockCallback).toBeCalledTimes(1);
  });
});

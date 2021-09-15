import { DependencyList } from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { BaseResponse } from 'types/common';
import useBackendServiceCallback from '../useBackendServiceCallback';
import { act } from 'react-dom/test-utils';

const setupTest = <TArgs extends any[], TData>(
  promiseFactory: TypedFunction<TArgs, Nullable<Promise<BaseResponse<TData>>>>,
  deps: DependencyList = [],
) => {
  return renderHook(() => useBackendServiceCallback(promiseFactory, deps));
};

// It returns undefined until we set by using mockFn.mockResolvedValue(fakeData);
const mockPromiseFactory = jest.fn();

describe('useBackendServiceCallback', () => {
  beforeEach(() => {
    // ref: https://jestjs.io/docs/timer-mocks#advance-timers-by-time
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
  });

  it('should return pending state on initial', () => {
    const { result } = setupTest(mockPromiseFactory, []);

    expect(result.current[0]).toStrictEqual({
      loading: false,
      data: undefined,
      error: undefined,
      success: undefined,
    });
  });

  it('should return pending state if not having promise', () => {
    const { result } = setupTest(mockPromiseFactory, []);
    const [state, callback] = result.current;

    callback();

    expect(state).toStrictEqual({
      loading: false,
      data: undefined,
      error: undefined,
      success: undefined,
    });
  });

  it('should return loading state', () => {
    const { result } = setupTest(mockPromiseFactory, []);

    mockPromiseFactory.mockResolvedValue(
      new Promise((resolve) => setTimeout(resolve)),
    );

    //because state changes internally. So, we must use act
    act(() => {
      result.current[1](); // callback
    });

    expect(result.current[0]).toStrictEqual({
      loading: true,
      data: undefined,
      error: undefined,
      success: undefined,
    });
  });

  it('should return success state', async () => {
    const { result, waitForNextUpdate } = setupTest(mockPromiseFactory, []);
    const fakeResult = {
      kind: 'success',
      data: { content: 'tai nguyen' },
      message: 'success messsage',
    };

    mockPromiseFactory.mockResolvedValue(
      new Promise((resolve) => setTimeout(resolve, 100, fakeResult)),
    );

    act(() => {
      result.current[1](); // callback
    });

    // excute timers because fakeTimers dont excute any timer automatically
    jest.runAllTimers();

    // waiting for next update
    await waitForNextUpdate();

    expect(result.current[0]).toStrictEqual({
      loading: false,
      data: fakeResult.data,
      error: undefined,
      success: fakeResult.message,
    });
  });

  it('should return failed state', async () => {
    const { result, waitForNextUpdate } = setupTest(mockPromiseFactory, []);
    const fakeResult = {
      kind: 'failed',
      data: undefined,
    };

    mockPromiseFactory.mockResolvedValue(
      new Promise((_, reject) => setTimeout(reject, 100, fakeResult)),
    );

    act(() => {
      result.current[1](); // callback
    });

    // excute timers because fakeTimers dont excute any timer automatically
    jest.runAllTimers();

    // waiting for next update
    await waitForNextUpdate();

    expect(result.current[0]).toStrictEqual({
      loading: false,
      data: undefined,
      success: undefined,
      error: undefined,
    });
  });
});

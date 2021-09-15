import { renderHook } from '@testing-library/react-hooks';
import useTitle, { UseTitleOptions } from '../useTitle';

const setupTest = (title: string, options?: UseTitleOptions) => {
  return renderHook(() => useTitle(title, options));
};

describe('useTitle', () => {
  it('should work', () => {
    setupTest('test title');

    expect(global.document.title).toEqual('test title');
  });

  it('should restore on unmounting', () => {
    const { unmount } = setupTest('test title', { restoreOnUnmount: true });

    expect(global.document.title).toEqual('test title');

    unmount();
    expect(global.document.title).toEqual('test title');
  });
});

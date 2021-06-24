import { useState, useCallback } from 'react';
import { DEFAULT_PAGE_SIZE } from 'constants/common';

const usePagination = (
  defaultPage = 1,
  defaultPageSize = DEFAULT_PAGE_SIZE,
) => {
  const [page, setPage] = useState(defaultPage);
  const [pageSize, setPageSize] = useState(defaultPageSize);
  const handleChange = useCallback((_page: number, _pageSize: number) => {
    setPage(_page);
    setPageSize(_pageSize);
  }, []);

  return {
    page,
    pageSize,
    setPage,
    setPageSize,
    handleChangePagination: handleChange,
  };
};

export default usePagination;

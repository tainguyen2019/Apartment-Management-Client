import { RootState } from 'redux/rootReducer';

export const selectReceiptState = (state: RootState) => {
  const { loading, data, errorMessage } = state.receipt;
  const receipts = data?.receipts ?? [];
  const totalPages = data?.totalPages ?? 0;

  return { loading, errorMessage, receipts, totalPages };
};

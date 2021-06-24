import { RootState } from 'redux/rootReducer';

export const selectReceiptDetailState = (state: RootState) => {
  const { loading, data, errorMessage } = state.receiptDetail;
  const receiptDetails = data?.details ?? [];

  return { loading, errorMessage, receiptDetails };
};

import { RootState } from 'redux/rootReducer';

export const selectAccountState = (state: RootState) => {
  const { loading, data, errorMessage } = state.account;
  const accounts = data?.accounts ?? [];
  const totalPages = data?.totalPages ?? 0;

  return { loading, errorMessage, accounts, totalPages };
};

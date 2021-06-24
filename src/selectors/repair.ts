import { RootState } from 'redux/rootReducer';

export const selectRepairState = (state: RootState) => {
  const { loading, data, errorMessage } = state.repair;
  const repairs = data?.repairs ?? [];
  const totalPages = data?.totalPages ?? 0;

  return { loading, errorMessage, repairs, totalPages };
};

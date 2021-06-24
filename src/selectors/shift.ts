import { RootState } from 'redux/rootReducer';

export const selectShiftState = (state: RootState) => {
  const { loading, data, errorMessage } = state.shift;
  const shifts = data?.shifts ?? [];
  const totalPages = data?.totalPages ?? 0;

  return { loading, errorMessage, shifts, totalPages };
};

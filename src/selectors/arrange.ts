import { RootState } from 'redux/rootReducer';

export const selectArrangeState = (state: RootState) => {
  const { loading, data, errorMessage } = state.arrange;
  const arranges = data?.arranges ?? [];
  const totalPages = data?.totalPages ?? 0;

  return { loading, errorMessage, arranges, totalPages };
};

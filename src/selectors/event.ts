import { RootState } from 'redux/rootReducer';

export const selectEventState = (state: RootState) => {
  const { loading, data, errorMessage } = state.event;
  const events = data?.events ?? [];
  const totalPages = data?.totalPages ?? 0;

  return { loading, errorMessage, events, totalPages };
};

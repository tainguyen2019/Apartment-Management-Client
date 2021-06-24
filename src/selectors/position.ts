import { RootState } from 'redux/rootReducer';

export const selectPositionState = (state: RootState) => {
  const { loading, data } = state.position;
  const positions = data?.positions ?? [];

  return { loading, positions };
};

import { RootState } from 'redux/rootReducer';

export const selectFeeState = (state: RootState) => {
  const { loading, data, errorMessage } = state.fee;
  const fees = data?.fees ?? [];

  return { loading, errorMessage, fees };
};

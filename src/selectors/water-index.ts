import { RootState } from 'redux/rootReducer';

export const selectWaterIndexState = (state: RootState) => {
  const { loading, data, errorMessage } = state.waterIndex;
  const waterIndexes = data?.waterIndexes ?? [];
  const totalPages = data?.totalPages ?? 0;

  return { loading, errorMessage, waterIndexes, totalPages };
};

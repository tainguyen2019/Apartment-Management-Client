import { RootState } from 'redux/rootReducer';

export const selectAreaState = (state: RootState) => {
  const { loading, data } = state.area;
  const areas = data?.areas ?? [];

  return { loading, areas };
};

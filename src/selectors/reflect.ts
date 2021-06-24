import { RootState } from 'redux/rootReducer';

export const selectReflectState = (state: RootState) => {
  const { loading, data, errorMessage } = state.reflect;
  const reflects = data?.reflects ?? [];
  const totalPages = data?.totalPages ?? 0;

  return { loading, errorMessage, reflects, totalPages };
};

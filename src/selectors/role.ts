import { RootState } from 'redux/rootReducer';

export const selectRoleState = (state: RootState) => {
  const { loading, data, errorMessage } = state.role;
  const roles = data?.roles ?? [];
  const totalPages = data?.totalPages ?? 0;

  return { loading, errorMessage, roles, totalPages };
};

import { RootState } from 'redux/rootReducer';

export const selectDepartmentState = (state: RootState) => {
  const { loading, data } = state.department;
  const departments = data?.departments ?? [];

  return { loading, departments };
};

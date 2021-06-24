import { RootState } from 'redux/rootReducer';

export const selectTechniqueStaffState = (state: RootState) => {
  const { loading, data } = state.techniqueStaff;
  const staffs = data?.staffs ?? [];

  return { loading, staffs };
};

import { RootState } from 'redux/rootReducer';

export const selectStaffState = (state: RootState) => {
  const { loading, data, errorMessage } = state.staff;
  const staffs = data?.staffs ?? [];
  const totalPages = data?.totalPages ?? 0;

  return { loading, errorMessage, staffs, totalPages };
};

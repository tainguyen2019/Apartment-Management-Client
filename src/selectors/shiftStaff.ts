import { RootState } from 'redux/rootReducer';

export const selectShiftStaffState = (state: RootState) => {
  const { loading, data } = state.shiftStaff;
  const staffs = data?.staffs ?? [];

  return { loading, staffs };
};

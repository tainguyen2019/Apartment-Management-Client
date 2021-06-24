import { RootState } from 'redux/rootReducer';

export const selectPayslipState = (state: RootState) => {
  const { loading, data, errorMessage } = state.payslip;
  const payslips = data?.payslips ?? [];
  const totalPages = data?.totalPages ?? 0;

  return { loading, errorMessage, payslips, totalPages };
};

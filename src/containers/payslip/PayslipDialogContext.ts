import { createContext } from 'react';
import { Payslip } from 'types/payslip';

type PayslipDialogContextValues = {
  payslip?: Payslip;
  open: boolean;
};

const defaultValues: PayslipDialogContextValues = { open: false };
const PayslipDialogContext = createContext(defaultValues);

export default PayslipDialogContext;

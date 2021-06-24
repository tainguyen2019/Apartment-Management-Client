import { createContext } from 'react';
import { Staff } from 'types/staff';

type StaffDialogContextValues = {
  staff?: Staff;
  open: boolean;
};

const defaultValues: StaffDialogContextValues = { open: false };
const StaffDialogContext = createContext(defaultValues);

export default StaffDialogContext;

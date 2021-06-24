import { createContext } from 'react';
import { RepairDialogContextValues } from 'types/repair';

const defaultValues: RepairDialogContextValues = { open: false };
const AssignmentDialogContext = createContext(defaultValues);

export default AssignmentDialogContext;

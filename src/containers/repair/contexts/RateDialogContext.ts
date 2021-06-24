import { createContext } from 'react';
import { RepairDialogContextValues } from 'types/repair';

const defaultValues: RepairDialogContextValues = { open: false };
const RateDialogContext = createContext(defaultValues);

export default RateDialogContext;

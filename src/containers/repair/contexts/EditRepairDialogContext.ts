import { createContext } from 'react';
import { RepairDialogContextValues } from 'types/repair';

const defaultValues: RepairDialogContextValues = { open: false };
const EditVehicleDialogContext = createContext(defaultValues);

export default EditVehicleDialogContext;

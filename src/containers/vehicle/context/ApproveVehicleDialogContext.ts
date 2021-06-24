import { createContext } from 'react';
import { VehicleDialogContextValues } from 'types/vehicle';

const defaultValues: VehicleDialogContextValues = { open: false };
const ApproveVehicleDialogContext = createContext(defaultValues);

export default ApproveVehicleDialogContext;

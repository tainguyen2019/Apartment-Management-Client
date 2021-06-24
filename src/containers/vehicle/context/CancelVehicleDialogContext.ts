import { createContext } from 'react';
import { VehicleDialogContextValues } from 'types/vehicle';

const defaultValues: VehicleDialogContextValues = { open: false };
const CancelVehicleDialogContext = createContext(defaultValues);

export default CancelVehicleDialogContext;

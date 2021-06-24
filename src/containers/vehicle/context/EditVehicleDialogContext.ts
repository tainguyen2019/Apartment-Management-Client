import { createContext } from 'react';
import { VehicleDialogContextValues } from 'types/vehicle';

const defaultValues: VehicleDialogContextValues = { open: false };
const EditVehicleDialogContext = createContext(defaultValues);

export default EditVehicleDialogContext;

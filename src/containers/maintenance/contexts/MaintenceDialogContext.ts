import { createContext } from 'react';
import { MaintenanceDialogContextValues } from 'types/maintenance';

const defaultValues: MaintenanceDialogContextValues = { open: false };
const MaintenanceDialogContext = createContext(defaultValues);

export default MaintenanceDialogContext;

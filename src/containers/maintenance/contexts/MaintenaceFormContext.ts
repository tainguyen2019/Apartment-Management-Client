import { createContext } from 'react';
import { RecordEditor } from 'types/common';
import { Maintenance } from 'types/maintenance';

interface MiantenanceFormContextValues {
  onRefresh?: VoidFunction;
  onEdit?: RecordEditor<Maintenance>;
}

const MaintenanceFormContext = createContext<MiantenanceFormContextValues>({});

export default MaintenanceFormContext;

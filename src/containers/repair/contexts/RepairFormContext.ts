import { createContext } from 'react';
import { RecordEditor } from 'types/common';
import { Repair } from 'types/repair';

interface RepairFormContextValues {
  onRefresh?: VoidFunction;
  onEdit?: RecordEditor<Repair>;
  onAssignment?: RecordEditor<Repair>;
  onRate?: RecordEditor<Repair>;
}

const RepairFormContext = createContext<RepairFormContextValues>({});

export default RepairFormContext;

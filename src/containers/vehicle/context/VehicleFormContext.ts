import { createContext } from 'react';
import { RecordEditor } from 'types/common';
import { Vehicle } from 'types/vehicle';

interface VehicleFormContextValues {
  onRefresh?: VoidFunction;
  onEdit?: RecordEditor<Vehicle>;
  onApprove?: RecordEditor<Vehicle>;
  onCancel?: RecordEditor<Vehicle>;
  onRestore?: RecordEditor<Vehicle>;
}

const VehicleFormContext = createContext<VehicleFormContextValues>({});

export default VehicleFormContext;

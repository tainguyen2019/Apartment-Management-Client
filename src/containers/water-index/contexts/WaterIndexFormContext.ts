import { createContext } from 'react';
import { RecordEditor } from 'types/common';
import { WaterIndex } from 'types/water-index';

interface WaterIndexFormContextValues {
  onRefresh?: VoidFunction;
  onEdit?: RecordEditor<WaterIndex>;
}

const WaterIndexFormContext = createContext<WaterIndexFormContextValues>({});

export default WaterIndexFormContext;

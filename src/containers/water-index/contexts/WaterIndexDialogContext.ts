import { createContext } from 'react';
import { WaterIndex } from 'types/water-index';

type WaterIndexDialogContextValues = {
  open: boolean;
  waterIndex?: WaterIndex;
  onClose?: VoidFunction;
};

const defaultValues: WaterIndexDialogContextValues = { open: false };
const WaterIndexDialogContext = createContext(defaultValues);

export default WaterIndexDialogContext;

import { createContext } from 'react';
import { Shift } from 'types/shift';

type ShiftDialogContextValues = {
  shift?: Shift;
  open: boolean;
};

const defaultValues: ShiftDialogContextValues = { open: false };
const ShiftDialogContext = createContext(defaultValues);

export default ShiftDialogContext;

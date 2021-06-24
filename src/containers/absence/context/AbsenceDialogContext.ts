import { createContext } from 'react';
import { Absence } from 'types/absence';

type AbsenceDialogContextValues = {
  open: boolean;
  absence?: Absence;
  onClose?: VoidFunction;
};

const defaultValues: AbsenceDialogContextValues = { open: false };
const AbsenceDialogContext = createContext(defaultValues);

export default AbsenceDialogContext;

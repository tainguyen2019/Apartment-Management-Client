import { createContext } from 'react';
import { AbsenceDialogContextValues } from 'types/absence';

const defaultValues: AbsenceDialogContextValues = { open: false };
const AbsenceDialogContext = createContext(defaultValues);

export default AbsenceDialogContext;

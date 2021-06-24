import { createContext } from 'react';
import { AbsenceDialogContextValues } from 'types/absence';

const defaultValues: AbsenceDialogContextValues = { open: false };
const RejectAbsenceDialogContext = createContext(defaultValues);

export default RejectAbsenceDialogContext;

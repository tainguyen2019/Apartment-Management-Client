import { createContext } from 'react';
import { EventDialogContextValues } from 'types/event';

const defaultValues: EventDialogContextValues = { open: false };
const CancelEventDialogContext = createContext(defaultValues);

export default CancelEventDialogContext;

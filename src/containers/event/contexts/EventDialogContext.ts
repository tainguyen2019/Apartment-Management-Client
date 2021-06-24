import { createContext } from 'react';
import { EventDialogContextValues } from 'types/event';

const defaultValues: EventDialogContextValues = { open: false };
const EventDialogContext = createContext(defaultValues);

export default EventDialogContext;

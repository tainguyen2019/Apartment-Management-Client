import { createContext } from 'react';
import { ReflectDialogContextValues } from 'types/reflect';

const defaultValues: ReflectDialogContextValues = { open: false };
const ViewReflectDialogContext = createContext(defaultValues);

export default ViewReflectDialogContext;

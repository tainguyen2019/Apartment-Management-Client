import { createContext } from 'react';
import { ReflectDialogContextValues } from 'types/reflect';

const defaultValues: ReflectDialogContextValues = { open: false };
const ReflectDialogContext = createContext(defaultValues);

export default ReflectDialogContext;

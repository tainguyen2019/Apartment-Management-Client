import { createContext } from 'react';
import { ReflectDialogContextValues } from 'types/reflect';

const defaultValues: ReflectDialogContextValues = { open: false };
const AnswerReflectDialogContext = createContext(defaultValues);

export default AnswerReflectDialogContext;

import { createContext } from 'react';
import { ArrangeDialogContextValues } from 'types/arrange';

const defaultValues: ArrangeDialogContextValues = { open: false };
const ArrangeDialogContext = createContext(defaultValues);

export default ArrangeDialogContext;

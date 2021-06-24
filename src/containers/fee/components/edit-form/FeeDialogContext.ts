import { createContext } from 'react';
import { Fee } from 'types/fee';

type FeeDialogContextValues = {
  fee?: Fee;
  open: boolean;
};

const defaultValues: FeeDialogContextValues = { open: false };
const FeeDialogContext = createContext(defaultValues);

export default FeeDialogContext;

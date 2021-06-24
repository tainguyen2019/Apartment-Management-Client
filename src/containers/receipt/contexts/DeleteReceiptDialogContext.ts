import { createContext } from 'react';
import { ReceiptDialogContextValues } from 'types/receipt';

const defaultValues: ReceiptDialogContextValues = { open: false };
const DeleteReceiptDialogContext = createContext(defaultValues);

export default DeleteReceiptDialogContext;

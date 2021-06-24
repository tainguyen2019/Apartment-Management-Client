import { createContext } from 'react';
import { ReceiptDialogContextValues } from 'types/receipt';

const defaultValues: ReceiptDialogContextValues = { open: false };
const ViewReceiptDialogContext = createContext(defaultValues);

export default ViewReceiptDialogContext;

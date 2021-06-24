import { createContext } from 'react';
import { RecordEditor } from 'types/common';
import { Receipt } from 'types/receipt';

type ReceiptFormContextValues = {
  onRefresh?: VoidFunction;
  onView?: RecordEditor<Receipt>;
  onDelete?: RecordEditor<Receipt>;
};

const ReceiptDialogContext = createContext<ReceiptFormContextValues>({});

export default ReceiptDialogContext;

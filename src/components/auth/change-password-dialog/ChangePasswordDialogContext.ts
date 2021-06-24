import { createContext } from 'react';

interface ChangePasswordDialogContextValues {
  open?: boolean;
  onClose?: VoidFunction;
}

const ChangePasswordDialogContext =
  createContext<ChangePasswordDialogContextValues>({});

export default ChangePasswordDialogContext;

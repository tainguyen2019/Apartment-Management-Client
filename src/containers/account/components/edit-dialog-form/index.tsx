import React, { useContext } from 'react';

import AccountDialogContext from '../../contexts/AccountDialogContext';
import DialogForm from './DialogForm';

const EditDialogForm: React.FC = () => {
  const { open, account, onClose } = useContext(AccountDialogContext);

  if (!account) return null;

  return <DialogForm open={open} account={account} onClose={onClose} />;
};

export default EditDialogForm;

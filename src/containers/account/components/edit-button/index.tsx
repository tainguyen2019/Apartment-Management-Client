import { Tooltip, IconButton } from '@material-ui/core';
import { Edit as EditIcon } from '@material-ui/icons';
import { useContext } from 'react';

import { Account } from 'types/account';
import AccountFormContext from '../../contexts/AccountFormContext';

interface EditButtonProps {
  account: Account;
}

const EditButton: React.FC<EditButtonProps> = ({ account }) => {
  const { onEdit } = useContext(AccountFormContext);

  return (
    <Tooltip title="Chỉnh sửa">
      <IconButton onClick={onEdit?.(account)}>
        <EditIcon />
      </IconButton>
    </Tooltip>
  );
};

export default EditButton;

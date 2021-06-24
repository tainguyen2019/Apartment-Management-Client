import { Tooltip, IconButton } from '@material-ui/core';
import { Delete as DeleteIcon } from '@material-ui/icons';
import { useContext } from 'react';

import { Receipt } from 'types/receipt';
import ReceiptFormContext from '../../contexts/ReceiptFormContext';

interface DeleteButtonProps {
  receipt: Receipt;
}

const ViewButton: React.FC<DeleteButtonProps> = ({ receipt }) => {
  const { onDelete } = useContext(ReceiptFormContext);
  const visibility = receipt.status === 'Chưa thanh toán';

  if (!visibility) return null;

  return (
    <Tooltip title="Xóa">
      <IconButton onClick={onDelete?.(receipt)}>
        <DeleteIcon />
      </IconButton>
    </Tooltip>
  );
};

export default ViewButton;

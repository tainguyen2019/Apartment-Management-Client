import { Tooltip, IconButton } from '@material-ui/core';
import { Visibility as ViewIcon } from '@material-ui/icons';
import { useContext } from 'react';

import { Receipt } from 'types/receipt';
import ReceiptFormContext from '../../contexts/ReceiptFormContext';

interface ViewButtonProps {
  receipt: Receipt;
}

const ViewButton: React.FC<ViewButtonProps> = ({ receipt }) => {
  const { onView } = useContext(ReceiptFormContext);

  return (
    <Tooltip title="Xem chi tiết">
      <IconButton onClick={onView?.(receipt)}>
        <ViewIcon />
      </IconButton>
    </Tooltip>
  );
};

export default ViewButton;

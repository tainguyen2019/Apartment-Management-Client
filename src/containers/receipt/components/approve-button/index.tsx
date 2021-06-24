import { useContext } from 'react';
import { Tooltip, IconButton, Grid } from '@material-ui/core';
import { Check as CheckIcon } from '@material-ui/icons';

import { Receipt } from 'types/receipt';

import Spin from 'ui/spin';

import useBackendServiceCallback from 'hooks/useBackendServiceCallback';
import receiptService from 'services/receipt';
import useDidUpdate from 'hooks/useDidUpdate';
import ReceiptFormContext from '../../contexts/ReceiptFormContext';

interface ApproveButtonProps {
  receipt: Receipt;
}

const ApproveButton: React.FC<ApproveButtonProps> = ({ receipt }) => {
  const { onRefresh } = useContext(ReceiptFormContext);
  const [{ loading, success }, approveReceipt] = useBackendServiceCallback(
    receiptService.approve,
  );

  const visibility = receipt.status !== 'Đã thanh toán';

  const handleApprove = () => {
    approveReceipt(receipt.id);
  };

  useDidUpdate(() => {
    if (success && onRefresh) {
      setTimeout(onRefresh, 500);
    }
  }, [success]);

  if (!visibility) return null;

  return (
    <Grid container alignItems="center">
      <Spin loading={loading} size={18}>
        <Tooltip title="Xác nhận">
          <IconButton onClick={handleApprove}>
            <CheckIcon color="primary" />
          </IconButton>
        </Tooltip>
      </Spin>
    </Grid>
  );
};

export default ApproveButton;

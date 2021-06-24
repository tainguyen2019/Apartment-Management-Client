import { useContext } from 'react';

import useBackendServiceCallback from 'hooks/useBackendServiceCallback';
import ConfirmationDialog from 'ui/confirmation-dialog';
import receiptService from 'services/receipt';

import ReceiptFormContext from '../../contexts/ReceiptFormContext';
import DeleteReceiptDialogContext from '../../contexts/DeleteReceiptDialogContext';
import useDidUpdate from 'hooks/useDidUpdate';

const DeleteDialogForm: React.FC = () => {
  const { onRefresh } = useContext(ReceiptFormContext);
  const { open, receipt, onClose } = useContext(DeleteReceiptDialogContext);
  const [{ success }, deleteReceipt] = useBackendServiceCallback(
    receiptService.delete,
  );

  const handleDelete = () => {
    deleteReceipt(receipt?.id!);
  };

  useDidUpdate(() => {
    if (success && onRefresh && onClose) {
      setTimeout(onRefresh, 1000);
      setTimeout(onClose, 500);
    }
  }, [success]);

  if (!receipt) return null;

  return (
    <ConfirmationDialog
      cancelText="Hủy bỏ"
      confirmText="Đồng ý"
      heading="Xóa phiếu thu"
      onCancel={onClose}
      onClose={onClose}
      onConfirm={handleDelete}
      open={open}
    >
      Bạn có chắc sẽ xóa phiếu thu này?
    </ConfirmationDialog>
  );
};

export default DeleteDialogForm;

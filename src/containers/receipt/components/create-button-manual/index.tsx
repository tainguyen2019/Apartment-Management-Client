import React from 'react';
import Button from '@material-ui/core/Button';
import { DefaultValues, SubmitHandler } from 'react-hook-form';

import useBackendServiceCallback from 'hooks/useBackendServiceCallback';
import useDidUpdate from 'hooks/useDidUpdate';
import useToggle from 'hooks/useToggle';
import receiptService from 'services/receipt';
import { ReceiptFormValues } from 'types/receipt';

import ReceiptFormManual from '../receipt-dialog-form-manual';
import storageService from 'services/storage';

const initialValues: DefaultValues<ReceiptFormValues> = {
  receipt: {
    content: '',
    apartment_id: '',
    total: 0,
  },
  details: [],
};

interface CreateButtonProps {
  onRefresh: VoidFunction;
}

const CreateButton: React.FC<CreateButtonProps> = ({ onRefresh }) => {
  const [open, toggle] = useToggle();
  const [{ loading, success }, createReceipt] = useBackendServiceCallback(
    receiptService.create,
  );

  const handleCreateReceipt: SubmitHandler<ReceiptFormValues> = (values) => {
    const staff_id = storageService.getItem<string>('staff_id') || '';
    const total = values.details.reduce((sum, { factor, price }) => {
      if (factor && price) {
        return sum + Number(factor) * Number(price);
      }

      return sum;
    }, 0);
    createReceipt({
      ...values,
      receipt: {
        ...values.receipt,
        staff_id,
        total,
      },
    });
  };

  useDidUpdate(() => {
    if (success) {
      setTimeout(onRefresh, 1000);
      setTimeout(toggle, 500);
    }
  }, [success]);

  return (
    <>
      <Button variant="outlined" color="primary" onClick={toggle}>
        Tạo thủ công
      </Button>
      <ReceiptFormManual
        title="Thêm mới phiếu thu"
        open={open}
        loading={loading}
        initialValues={initialValues}
        onClose={toggle}
        onSubmit={handleCreateReceipt}
      />
    </>
  );
};

export default CreateButton;

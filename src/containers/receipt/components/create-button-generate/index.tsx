import React from 'react';
import Button from '@material-ui/core/Button';
import { SubmitHandler } from 'react-hook-form';
import dayjs from 'dayjs';

import useToggle from 'hooks/useToggle';
import { GenerateReceiptParams } from 'types/receipt';
import storageService from 'services/storage';
import receiptService from 'services/receipt';

import ReceiptFormGenerate from '../receipt-dialog-form-generate';
import useBackendServiceCallback from 'hooks/useBackendServiceCallback';

const initialValues: GenerateReceiptParams = {
  apartment_id: '',
  month: dayjs().get('month') + 1,
  year: dayjs().get('year'),
};

interface CreateButtonGenerateProps {
  onRefresh: VoidFunction;
}

const CreateButtonGenerate: React.FC<CreateButtonGenerateProps> = ({
  onRefresh,
}) => {
  const [{ data: receiptData, loading }, generateReceipt] =
    useBackendServiceCallback(receiptService.generate);
  const [open, toggle] = useToggle();
  const staff_id = storageService.getItem<string>('staff_id') || '';

  const handleGenerateReceipt: SubmitHandler<GenerateReceiptParams> = (
    values,
  ) => {
    generateReceipt({ ...values, staff_id });
  };

  const handleClose = () => {
    toggle();
    onRefresh();
  };

  return (
    <>
      <Button variant="outlined" color="primary" onClick={toggle}>
        Tạo tự động
      </Button>
      <ReceiptFormGenerate
        title="Tạo phiếu thu tự động"
        open={open}
        loading={loading}
        initialValues={initialValues}
        receiptData={receiptData}
        onClose={handleClose}
        onSubmit={handleGenerateReceipt}
      />
    </>
  );
};

export default CreateButtonGenerate;

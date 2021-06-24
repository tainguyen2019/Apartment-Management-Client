import React, { useContext } from 'react';
import { SubmitHandler } from 'react-hook-form';

import FeeForm from 'containers/fee/components/fee-form';
import feeService from 'services/fee';
import useBackendServiceCallback from 'hooks/useBackendServiceCallback';
import useDidUpdate from 'hooks/useDidUpdate';
import { FeeFormValues } from 'types/fee';

import FeeDialogContext from './FeeDialogContext';

interface EditFormProps {
  onClose: React.MouseEventHandler;
  onRefresh: VoidFunction;
}

const EditForm: React.FC<EditFormProps> = ({ onClose, onRefresh }) => {
  const { open, fee } = useContext(FeeDialogContext);
  const [{ success, loading }, updateFee] = useBackendServiceCallback(
    feeService.update,
  );

  useDidUpdate(() => {
    if (success) {
      setTimeout(onRefresh, 1000);
      setTimeout(onClose, 500);
    }
  }, [success]);

  if (!fee) return null;

  const { id, name, unit, amount } = fee;
  const initialValues: FeeFormValues = {
    name,
    unit,
    amount,
  };

  const onSubmit: SubmitHandler<FeeFormValues> = (values) => {
    updateFee({
      ...values,
      id: id!,
    });
  };

  return (
    <FeeForm
      key={'edit-fee'}
      title="Cập nhật thông tin khoản phí"
      initialValues={initialValues}
      open={open}
      loading={loading}
      onClose={onClose}
      onSubmit={onSubmit}
    />
  );
};

export default EditForm;

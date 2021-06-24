import React, { useContext } from 'react';
import { SubmitHandler } from 'react-hook-form';

import payslipService from 'services/payslip';
import useBackendServiceCallback from 'hooks/useBackendServiceCallback';
import useDidUpdate from 'hooks/useDidUpdate';
import { PayslipFormValues } from 'types/payslip';

import Payslip from '../payslip-dialog-form';
import PayslipDialogContext from '../../PayslipDialogContext';

interface EditFormProps {
  onClose: React.MouseEventHandler;
  onRefresh: VoidFunction;
}

const EditForm: React.FC<EditFormProps> = ({ onClose, onRefresh }) => {
  const { open, payslip } = useContext(PayslipDialogContext);
  const [{ loading, success }, updatePayslip] = useBackendServiceCallback(
    payslipService.update,
  );

  useDidUpdate(() => {
    if (success) {
      setTimeout(onRefresh, 1000);
      setTimeout(onClose, 500);
    }
  }, [success]);

  if (!payslip) return null;

  const { content, total, id } = payslip;
  const initialValues: PayslipFormValues = {
    content,
    total,
  };

  const onSubmit: SubmitHandler<PayslipFormValues> = (values) => {
    updatePayslip({
      ...values,
      id: id!,
    });
  };

  return (
    <Payslip
      key={'edit-payslip'}
      title="Cập nhật phiếu chi"
      initialValues={initialValues}
      open={open}
      loading={loading}
      onClose={onClose}
      onSubmit={onSubmit}
    />
  );
};

export default EditForm;

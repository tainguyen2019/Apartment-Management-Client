import React from 'react';
import Button from '@material-ui/core/Button';

import useBackendServiceCallback from 'hooks/useBackendServiceCallback';
import useDidUpdate from 'hooks/useDidUpdate';
import useToggle from 'hooks/useToggle';
import payslipService from 'services/payslip';
import { PayslipFormValues } from 'types/payslip';
import { SubmitHandler } from 'react-hook-form';
import storageService from 'services/storage';

import EventForm from '../payslip-dialog-form';

const initialValues: PayslipFormValues = {
  content: '',
  total: '',
};

interface CreateButtonProps {
  onRefresh: VoidFunction;
}

const CreateButton: React.FC<CreateButtonProps> = ({ onRefresh }) => {
  const [open, toggle] = useToggle();
  const [{ loading, success }, createEvent] = useBackendServiceCallback(
    payslipService.create,
  );

  const handleCreateEvent: SubmitHandler<PayslipFormValues> = (values) => {
    const staff_id = storageService.getItem<string>('staff_id') || '';
    createEvent({ ...values, staff_id });
  };

  useDidUpdate(() => {
    if (success) {
      setTimeout(toggle, 500);
      setTimeout(onRefresh, 1000);
    }
  }, [success]);

  return (
    <>
      <Button variant="outlined" color="primary" onClick={toggle}>
        Thêm mới
      </Button>
      <EventForm
        key={'insert-payslip'}
        title="Thêm mới phiếu chi"
        open={open}
        loading={loading}
        initialValues={initialValues}
        onClose={toggle}
        onSubmit={handleCreateEvent}
      />
    </>
  );
};

export default CreateButton;

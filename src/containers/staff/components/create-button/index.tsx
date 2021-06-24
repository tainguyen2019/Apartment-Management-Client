import React from 'react';
import { Button } from '@material-ui/core';

import useBackendServiceCallback from 'hooks/useBackendServiceCallback';
import useDidUpdate from 'hooks/useDidUpdate';
import useToggle from 'hooks/useToggle';
import staffService from 'services/staff';
import { StaffFormValues } from 'types/staff';
import StaffDialogForm from '../staff-dialog-form';

const initialValues: StaffFormValues = {
  name: '',
  phone: '',
  email: '',
  position_id: '',
  salary: 0,
  status: 'Đang làm việc',
};

interface InsertButtonProps {
  onRefresh: VoidFunction;
}

const CreateButton: React.FC<InsertButtonProps> = ({ onRefresh }) => {
  const [open, toggle] = useToggle();
  const [{ loading, success }, createStaff] = useBackendServiceCallback(
    staffService.create,
  );

  useDidUpdate(() => {
    if (success) {
      setTimeout(onRefresh, 1000);
      setTimeout(toggle, 500);
    }
  }, [success]);

  return (
    <>
      <Button variant="outlined" size="medium" color="primary" onClick={toggle}>
        Thêm mới
      </Button>
      <StaffDialogForm
        key={'insert-staff'}
        initialValues={initialValues}
        loading={loading}
        open={open}
        title="Thêm mới nhân viên"
        onClose={toggle}
        onSubmit={createStaff}
      />
    </>
  );
};

export default CreateButton;

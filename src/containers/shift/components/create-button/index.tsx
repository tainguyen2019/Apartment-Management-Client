import React from 'react';
import { Button } from '@material-ui/core';
import dayjs from 'dayjs';

import useBackendServiceCallback from 'hooks/useBackendServiceCallback';
import useDidUpdate from 'hooks/useDidUpdate';
import useToggle from 'hooks/useToggle';
import shiftService from 'services/shift';
import { ShiftFormValues } from 'types/shift';
import ShiftDialogForm from '../shift-dialog-form';
import { FIELD_DATE_FORMAT } from 'constants/common';

const initialValues: ShiftFormValues = {
  area_id: '',
  date: dayjs().format(FIELD_DATE_FORMAT),
  description: '',
  shift: '',
  staff_id: '',
};

interface InsertButtonProps {
  onRefresh: VoidFunction;
}

const CreateButton: React.FC<InsertButtonProps> = ({ onRefresh }) => {
  const [open, toggle] = useToggle();
  const [{ loading, success }, createShift] = useBackendServiceCallback(
    shiftService.create,
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
      <ShiftDialogForm
        key={'insert-shift'}
        initialValues={initialValues}
        loading={loading}
        open={open}
        title="Thêm mới phân công ca trực"
        onClose={toggle}
        onSubmit={createShift}
      />
    </>
  );
};

export default CreateButton;

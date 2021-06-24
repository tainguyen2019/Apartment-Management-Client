import React from 'react';
import Button from '@material-ui/core/Button';
import dayjs from 'dayjs';

import useBackendServiceCallback from 'hooks/useBackendServiceCallback';
import useDidUpdate from 'hooks/useDidUpdate';
import useToggle from 'hooks/useToggle';
import repairService from 'services/repair';
import { RepairFormValues } from 'types/repair';
import { SubmitHandler } from 'react-hook-form';
import storageService from 'services/storage';
import { FIELD_DATE_FORMAT } from 'constants/common';

import RepairForm from '../repair-dialog-form';

const initialValues: RepairFormValues = {
  date: dayjs().format(FIELD_DATE_FORMAT),
  content: '',
};

interface CreateButtonProps {
  onRefresh: VoidFunction;
}

const CreateButton: React.FC<CreateButtonProps> = ({ onRefresh }) => {
  const [open, toggle] = useToggle();
  const [{ loading, success }, createReflect] = useBackendServiceCallback(
    repairService.create,
  );

  const handleCreateReflect: SubmitHandler<RepairFormValues> = (values) => {
    const apartment_id = storageService.getItem<string>('apartment_id') || '';

    createReflect({ ...values, apartment_id });
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
        Thêm mới
      </Button>
      <RepairForm
        key={'insert-reflect'}
        title="Thêm mới yêu cầu sửa chữa"
        open={open}
        loading={loading}
        initialValues={initialValues}
        onClose={toggle}
        onSubmit={handleCreateReflect}
      />
    </>
  );
};

export default CreateButton;

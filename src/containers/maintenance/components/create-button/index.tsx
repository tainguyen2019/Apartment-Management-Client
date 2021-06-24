import React from 'react';
import Button from '@material-ui/core/Button';
import dayjs from 'dayjs';

import useBackendServiceCallback from 'hooks/useBackendServiceCallback';
import useDidUpdate from 'hooks/useDidUpdate';
import useToggle from 'hooks/useToggle';
import maintenanceService from 'services/maintenance';
import { MaintenanceFormValues } from 'types/maintenance';
import { SubmitHandler } from 'react-hook-form';
import { FIELD_DATE_FORMAT } from 'constants/common';

import MaintenanceForm from '../maintenance-dialog-form';

const initialValues: MaintenanceFormValues = {
  staff_id: '',
  device_id: '',
  area_id: '',
  date: dayjs().format(FIELD_DATE_FORMAT),
};

interface CreateButtonProps {
  onRefresh: VoidFunction;
}

const CreateButton: React.FC<CreateButtonProps> = ({ onRefresh }) => {
  const [open, toggle] = useToggle();
  const [{ loading, success }, createMaintenance] = useBackendServiceCallback(
    maintenanceService.create,
  );

  const handleCreateMaintenance: SubmitHandler<MaintenanceFormValues> = (
    values,
  ) => {
    createMaintenance(values);
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
      <MaintenanceForm
        key={'insert-maintenance'}
        title="Thêm mới bảo trì"
        open={open}
        loading={loading}
        initialValues={initialValues}
        onClose={toggle}
        onSubmit={handleCreateMaintenance}
      />
    </>
  );
};

export default CreateButton;

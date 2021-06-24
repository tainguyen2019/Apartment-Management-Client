import React, { useContext } from 'react';
import { SubmitHandler } from 'react-hook-form';
import dayjs from 'dayjs';

import maintenanceService from 'services/maintenance';
import useBackendServiceCallback from 'hooks/useBackendServiceCallback';
import useDidUpdate from 'hooks/useDidUpdate';
import { MaintenanceFormValues } from 'types/maintenance';
import { FIELD_DATE_FORMAT } from 'constants/common';

import MaintenanceForm from '../maintenance-dialog-form';
import MaintenceDialogContext from '../../contexts/MaintenceDialogContext';
import MaintenaceFormContext from '../../contexts/MaintenaceFormContext';

const EditForm: React.FC = () => {
  const { open, maintenance, onClose } = useContext(MaintenceDialogContext);
  const { onRefresh } = useContext(MaintenaceFormContext);
  const [{ loading, success }, updateMaintenance] = useBackendServiceCallback(
    maintenanceService.update,
  );

  useDidUpdate(() => {
    if (success && onRefresh && onClose) {
      setTimeout(onRefresh, 1000);
      setTimeout(onClose, 500);
    }
  }, [success]);

  if (!maintenance) return null;

  const { id, device_id, area_id, staff_id, date } = maintenance;
  const initialValues: MaintenanceFormValues = {
    device_id,
    staff_id,
    area_id,
    date: dayjs(date).format(FIELD_DATE_FORMAT),
  };

  const onSubmit: SubmitHandler<MaintenanceFormValues> = (values) => {
    updateMaintenance({
      ...values,
      id: id!,
    });
  };

  return (
    <MaintenanceForm
      key={'edit-maintenance'}
      title="Cập nhật thông tin bảo trì"
      initialValues={initialValues}
      open={open}
      loading={loading}
      onClose={onClose}
      onSubmit={onSubmit}
    />
  );
};

export default EditForm;

import React, { useContext } from 'react';
import { SubmitHandler } from 'react-hook-form';

import DeviceForm from 'containers/device/components/device-form';
import deviceService from 'services/device';
import useBackendServiceCallback from 'hooks/useBackendServiceCallback';
import useDidUpdate from 'hooks/useDidUpdate';
import { DeviceFormValues } from 'types/device';

import DeviceDialogContext from './DeviceDialogContext';

interface EditFormProps {
  onClose: React.MouseEventHandler;
  onRefresh: VoidFunction;
}

const EditForm: React.FC<EditFormProps> = ({ onClose, onRefresh }) => {
  const { open, device } = useContext(DeviceDialogContext);
  const [{ success, loading }, updateDevice] = useBackendServiceCallback(
    deviceService.update,
  );

  useDidUpdate(() => {
    if (success) {
      setTimeout(onRefresh, 1000);
      setTimeout(onClose, 500);
    }
  }, [success]);

  if (!device) return null;

  const { id, name, description } = device;
  const initialValues: DeviceFormValues = {
    name,
    description,
  };

  const onSubmit: SubmitHandler<DeviceFormValues> = (values) => {
    updateDevice({
      ...values,
      id: id!,
    });
  };

  return (
    <DeviceForm
      key={'edit-device'}
      title="Cập nhật thông tin thiết bị"
      initialValues={initialValues}
      open={open}
      loading={loading}
      onClose={onClose}
      onSubmit={onSubmit}
    />
  );
};

export default EditForm;

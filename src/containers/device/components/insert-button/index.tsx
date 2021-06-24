import React from 'react';
import Button from '@material-ui/core/Button';

import DeviceForm from 'containers/device/components/device-form';
import useBackendServiceCallback from 'hooks/useBackendServiceCallback';
import useDidUpdate from 'hooks/useDidUpdate';
import useToggle from 'hooks/useToggle';
import deviceService from 'services/device';
import { DeviceFormValues } from 'types/device';
import { SubmitHandler } from 'react-hook-form';
import Spin from 'ui/spin';

const initialValues: DeviceFormValues = {
  name: '',
  description: '',
};

interface InsertButtonProps {
  onRefresh: VoidFunction;
}

const InsertButton: React.FC<InsertButtonProps> = ({ onRefresh }) => {
  const [open, toggle] = useToggle();
  const [{ loading, success }, createDevice] = useBackendServiceCallback(
    deviceService.create,
  );

  const handleCreatedevice: SubmitHandler<DeviceFormValues> = (values) => {
    createDevice(values);
  };

  useDidUpdate(() => {
    if (success) {
      setTimeout(onRefresh, 1000);
      setTimeout(toggle, 500);
    }
  }, [success]);

  return (
    <Spin loading={loading}>
      <Button variant="outlined" color="primary" onClick={toggle}>
        Thêm mới
      </Button>
      <DeviceForm
        key={'insert-device'}
        title="Thêm mới thiết bị"
        open={open}
        loading={loading}
        initialValues={initialValues}
        onClose={toggle}
        onSubmit={handleCreatedevice}
      />
    </Spin>
  );
};

export default InsertButton;

import React, { useContext } from 'react';
import { Button } from '@material-ui/core';

import useBackendServiceCallback from 'hooks/useBackendServiceCallback';
import useDidUpdate from 'hooks/useDidUpdate';
import useToggle from 'hooks/useToggle';
import vehicleService from 'services/vehicle';
import { VehicleFormValues } from 'types/vehicle';
import VehicleDialogForm from '../vehicle-dialog-form';
import { SubmitHandler } from 'react-hook-form';
import storageService from 'services/storage';
import VehicleFormContext from '../../context/VehicleFormContext';

const initialValues: VehicleFormValues = {
  plate_number: '',
  identity_card_number: '',
  type: 'Xe máy',
};

const CreateButton: React.FC = () => {
  const { onRefresh } = useContext(VehicleFormContext);
  const [open, toggle] = useToggle();
  const [{ loading, success }, createVehicle] = useBackendServiceCallback(
    vehicleService.create,
  );

  const handleCreateVehicle: SubmitHandler<VehicleFormValues> = (values) => {
    const apartment_id = storageService.getItem<string>('apartment_id') || '';
    createVehicle({ ...values, apartment_id });
  };

  useDidUpdate(() => {
    if (success && onRefresh) {
      setTimeout(onRefresh, 1000);
      setTimeout(toggle, 500);
    }
  }, [success]);

  return (
    <>
      <Button variant="outlined" size="medium" color="primary" onClick={toggle}>
        Thêm mới
      </Button>
      <VehicleDialogForm
        key={'create-vehicle'}
        initialValues={initialValues}
        loading={loading}
        open={open}
        title="Thêm mới thông tin gửi xe"
        onClose={toggle}
        onSubmit={handleCreateVehicle}
      />
    </>
  );
};

export default CreateButton;

import useBackendServiceCallback from 'hooks/useBackendServiceCallback';
import { useContext } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { VehicleFormValues } from 'types/vehicle';
import vehicleService from 'services/vehicle';
import useDidUpdate from 'hooks/useDidUpdate';

import EditVehicleDialogContext from '../../context/EditVehicleDialogContext';
import VehicleFormContext from '../../context/VehicleFormContext';
import VehicleDialogForm from '../vehicle-dialog-form';

const EditDialogForm: React.FC = () => {
  const { onRefresh } = useContext(VehicleFormContext);
  const { open, vehicle, onClose } = useContext(EditVehicleDialogContext);
  const [{ loading, success }, updateVehicle] = useBackendServiceCallback(
    vehicleService.update,
  );

  useDidUpdate(() => {
    if (success && onRefresh && onClose) {
      setTimeout(onRefresh, 1000);
      setTimeout(onClose, 500);
    }
  }, [success]);

  if (!vehicle) return null;

  const handleSubmit: SubmitHandler<VehicleFormValues> = (values) => {
    updateVehicle({
      ...values,
      id: vehicle!.id!,
    });
  };

  const { plate_number, identity_card_number, type } = vehicle;

  const initialValues: VehicleFormValues = {
    plate_number,
    identity_card_number,
    type,
  };

  return (
    <VehicleDialogForm
      key="edit-vehicle"
      initialValues={initialValues}
      loading={loading}
      open={open}
      title="Cập nhật thông tin gửi xe"
      onSubmit={handleSubmit}
      onClose={onClose}
    />
  );
};

export default EditDialogForm;

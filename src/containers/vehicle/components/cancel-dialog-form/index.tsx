import { useContext } from 'react';

import useBackendServiceCallback from 'hooks/useBackendServiceCallback';
import ConfirmationDialog from 'ui/confirmation-dialog';
import vehicleService from 'services/vehicle';

import VehicleFormContext from '../../context/VehicleFormContext';
import CanceDialogContext from '../../context/CancelVehicleDialogContext';
import useDidUpdate from 'hooks/useDidUpdate';

const CancelDialogForm: React.FC = () => {
  const { onRefresh } = useContext(VehicleFormContext);
  const { open, vehicle, onClose } = useContext(CanceDialogContext);
  const [{ success }, cancelVehicle] = useBackendServiceCallback(
    vehicleService.cancel,
  );

  const handleCancle = () => {
    cancelVehicle(vehicle?.id!);
  };

  useDidUpdate(() => {
    if (success && onRefresh && onClose) {
      setTimeout(onRefresh, 1000);
      setTimeout(onClose, 500);
    }
  }, [success]);

  if (!vehicle) return null;

  return (
    <ConfirmationDialog
      cancelText="Hủy bỏ"
      confirmText="Đồng ý"
      heading="Hủy thông tin gửi xe"
      onCancel={onClose}
      onClose={onClose}
      onConfirm={handleCancle}
      open={open}
    >
      Bạn có chắc sẽ hủy thông tin gửi xe này?
    </ConfirmationDialog>
  );
};

export default CancelDialogForm;

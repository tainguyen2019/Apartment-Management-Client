import { Tooltip, IconButton } from '@material-ui/core';
import { Block as CancelIcon } from '@material-ui/icons';
import { useContext } from 'react';

import { Vehicle } from 'types/vehicle';
import VehicleFormContext from '../../context/VehicleFormContext';

interface DeleteButtonProps {
  vehicle: Vehicle;
}

const CancelButton: React.FC<DeleteButtonProps> = ({ vehicle }) => {
  const { onCancel } = useContext(VehicleFormContext);
  const visibility = vehicle.status === 'Đang gửi';

  if (!visibility) return null;

  return (
    <Tooltip title="Hủy">
      <IconButton onClick={onCancel?.(vehicle)}>
        <CancelIcon />
      </IconButton>
    </Tooltip>
  );
};

export default CancelButton;

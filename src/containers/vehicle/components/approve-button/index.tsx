import { useContext } from 'react';
import { Tooltip, IconButton } from '@material-ui/core';
import { Check as CheckIcon } from '@material-ui/icons';

import { Vehicle } from 'types/vehicle';
import VehicleFormContext from '../../context/VehicleFormContext';

interface ApproveButtonProps {
  vehicle: Vehicle;
}

const ApproveButton: React.FC<ApproveButtonProps> = ({ vehicle }) => {
  const { onApprove } = useContext(VehicleFormContext);

  const visibility = vehicle.status === 'Chờ xử lý';

  if (!visibility) return null;

  return (
    <Tooltip title="Duyệt">
      <IconButton onClick={onApprove?.(vehicle)}>
        <CheckIcon color="primary" />
      </IconButton>
    </Tooltip>
  );
};

export default ApproveButton;

import { useContext } from 'react';
import { Tooltip, IconButton } from '@material-ui/core';
import { Edit as EditIcon } from '@material-ui/icons';

import { Vehicle } from 'types/vehicle';
import VehicleFormContext from '../../context/VehicleFormContext';
import storageService from 'services/storage';

interface EditButtonProps {
  vehicle: Vehicle;
}

const EditButton: React.FC<EditButtonProps> = ({ vehicle }) => {
  const { onEdit } = useContext(VehicleFormContext);
  const apartment_id = storageService.getItem<string>('apartment_id') ?? '';

  const visibility =
    vehicle.status === 'Chờ xử lý' && vehicle.apartment_id === apartment_id;

  if (!visibility) return null;

  return (
    <Tooltip title="Chỉnh sửa">
      <IconButton onClick={onEdit?.(vehicle)}>
        <EditIcon />
      </IconButton>
    </Tooltip>
  );
};

export default EditButton;

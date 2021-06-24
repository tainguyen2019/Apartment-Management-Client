import { useContext } from 'react';
import { Tooltip, IconButton } from '@material-ui/core';
import { Edit as EditIcon } from '@material-ui/icons';

import { Repair } from 'types/repair';
import RepairFormContext from '../../contexts/RepairFormContext';
import storageService from 'services/storage';

interface EditButtonProps {
  repair: Repair;
}

const EditButton: React.FC<EditButtonProps> = ({ repair }) => {
  const { onEdit } = useContext(RepairFormContext);
  const apartment_id = storageService.getItem<string>('apartment_id') ?? '';

  const visibility =
    repair.status === 'Chờ xử lý' && repair.apartment_id === apartment_id;

  if (!visibility) return null;

  return (
    <Tooltip title="Chỉnh sửa">
      <IconButton onClick={onEdit?.(repair)}>
        <EditIcon />
      </IconButton>
    </Tooltip>
  );
};

export default EditButton;

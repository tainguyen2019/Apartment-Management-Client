import { Tooltip, IconButton } from '@material-ui/core';
import { Edit as EditIcon } from '@material-ui/icons';
import { useContext } from 'react';
import storageService from 'services/storage';

import { Reflect } from 'types/reflect';
import ReflectFormContext from '../../contexts/ReflectFormContext';

interface EditButtonProps {
  reflect: Reflect;
}

const EditButton: React.FC<EditButtonProps> = ({ reflect }) => {
  const { onEdit } = useContext(ReflectFormContext);
  const apartmentId = storageService.getItem<string>('apartment_id') ?? '';
  const visibility =
    reflect.status === 'Chờ trả lời' && reflect.apartment_id === apartmentId;

  if (!visibility) return null;

  return (
    <Tooltip title="Chỉnh sửa">
      <IconButton onClick={onEdit?.(reflect)}>
        <EditIcon />
      </IconButton>
    </Tooltip>
  );
};

export default EditButton;

import { useContext } from 'react';
import { Tooltip, IconButton } from '@material-ui/core';
import { Edit as EditIcon } from '@material-ui/icons';

import { Event } from 'types/event';
import EventFormContext from '../../contexts/EventFormContext';
import storageService from 'services/storage';

interface EditButtonProps {
  event: Event;
}

const EditButton: React.FC<EditButtonProps> = ({ event }) => {
  const { onEdit } = useContext(EventFormContext);
  const apartment_id = storageService.getItem<string>('apartment_id') || '';

  const visibility =
    event.status === 'Chờ xử lý' && apartment_id === event.apartment_id;

  if (!visibility) return null;

  return (
    <Tooltip title="Chỉnh sửa">
      <IconButton onClick={onEdit?.(event)}>
        <EditIcon />
      </IconButton>
    </Tooltip>
  );
};

export default EditButton;

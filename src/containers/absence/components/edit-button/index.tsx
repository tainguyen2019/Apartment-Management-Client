import { useContext } from 'react';
import { Tooltip, IconButton } from '@material-ui/core';
import { Edit as EditIcon } from '@material-ui/icons';

import { Absence } from 'types/absence';
import storageService from 'services/storage';
import AbsenceFormContext from '../../context/AbsenceFormContext';

interface EditButtonProps {
  absence: Absence;
}

const EditButton: React.FC<EditButtonProps> = ({ absence }) => {
  const { onEdit } = useContext(AbsenceFormContext);
  const staffId = storageService.getItem<string>('staff_id') || '';

  const visibility =
    absence.status === 'Chờ xử lý' && absence.staff_id === staffId;

  if (!visibility) return null;

  return (
    <Tooltip title="Chỉnh sửa">
      <IconButton onClick={onEdit?.(absence)}>
        <EditIcon />
      </IconButton>
    </Tooltip>
  );
};

export default EditButton;

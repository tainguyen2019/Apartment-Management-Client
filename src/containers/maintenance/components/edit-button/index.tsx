import { useContext } from 'react';
import { Tooltip, IconButton } from '@material-ui/core';
import { Edit as EditIcon } from '@material-ui/icons';

import { Maintenance } from 'types/maintenance';
import MaintenaceFormContext from '../../contexts/MaintenaceFormContext';

interface EditButtonProps {
  maintenance: Maintenance;
}

const EditButton: React.FC<EditButtonProps> = ({ maintenance }) => {
  const { onEdit } = useContext(MaintenaceFormContext);

  return (
    <Tooltip title="Chỉnh sửa">
      <IconButton onClick={onEdit?.(maintenance)}>
        <EditIcon />
      </IconButton>
    </Tooltip>
  );
};

export default EditButton;

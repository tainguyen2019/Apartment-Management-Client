import { useContext } from 'react';
import { Tooltip, IconButton } from '@material-ui/core';
import { Edit as EditIcon } from '@material-ui/icons';

import { WaterIndex } from 'types/water-index';
import WaterIndexFormContext from '../../contexts/WaterIndexFormContext';

interface EditButtonProps {
  waterIndex: WaterIndex;
}

const EditButton: React.FC<EditButtonProps> = ({ waterIndex }) => {
  const { onEdit } = useContext(WaterIndexFormContext);

  const visibility = waterIndex.status === 'Chưa chốt';

  if (!visibility) return null;

  return (
    <Tooltip title="Chỉnh sửa">
      <IconButton onClick={onEdit?.(waterIndex)}>
        <EditIcon />
      </IconButton>
    </Tooltip>
  );
};

export default EditButton;

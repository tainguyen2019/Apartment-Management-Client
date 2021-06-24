import { useContext } from 'react';
import { Tooltip, IconButton } from '@material-ui/core';
import { Edit as EditIcon } from '@material-ui/icons';

import { Arrange } from 'types/arrange';
import ArrangeFormContext from '../../contexts/ArrangeFormContext';

interface EditButtonProps {
  arrange: Arrange;
}

const EditButton: React.FC<EditButtonProps> = ({ arrange }) => {
  const { onEdit } = useContext(ArrangeFormContext);

  return (
    <Tooltip title="Chỉnh sửa">
      <IconButton onClick={onEdit?.(arrange)}>
        <EditIcon />
      </IconButton>
    </Tooltip>
  );
};

export default EditButton;

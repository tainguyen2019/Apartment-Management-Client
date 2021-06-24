import { Tooltip, IconButton } from '@material-ui/core';
import { Visibility as ViewIcon } from '@material-ui/icons';
import { useContext } from 'react';

import { Reflect } from 'types/reflect';
import ReflectFormContext from '../../contexts/ReflectFormContext';

interface ViewButtonProps {
  reflect: Reflect;
}

// TODO only view apartment reflect, or it's a staff
const ViewButton: React.FC<ViewButtonProps> = ({ reflect }) => {
  const { onView } = useContext(ReflectFormContext);

  return (
    <Tooltip title="Xem chi tiết">
      <IconButton onClick={onView?.(reflect)}>
        <ViewIcon />
      </IconButton>
    </Tooltip>
  );
};

export default ViewButton;

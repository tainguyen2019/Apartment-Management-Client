import { useContext } from 'react';
import { Tooltip, IconButton } from '@material-ui/core';
import { Block as CancelIcon } from '@material-ui/icons';

import { Event } from 'types/event';
import EventFormContext from '../../contexts/EventFormContext';

interface CancelButtonProps {
  event: Event;
}

const CancelButton: React.FC<CancelButtonProps> = ({ event }) => {
  const { onCancel } = useContext(EventFormContext);

  const visibility = event.status === 'Chờ xử lý';

  if (!visibility) return null;

  return (
    <Tooltip title="Hủy">
      <IconButton onClick={onCancel?.(event)}>
        <CancelIcon color="primary" />
      </IconButton>
    </Tooltip>
  );
};

export default CancelButton;

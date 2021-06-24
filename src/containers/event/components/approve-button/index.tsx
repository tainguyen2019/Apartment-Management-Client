import { useContext } from 'react';
import { Tooltip, IconButton, Grid } from '@material-ui/core';
import { Check as CheckIcon } from '@material-ui/icons';

import { Event } from 'types/event';

import Spin from 'ui/spin';

import useBackendServiceCallback from 'hooks/useBackendServiceCallback';
import eventService from 'services/event';
import useDidUpdate from 'hooks/useDidUpdate';
import EventFormContext from '../../contexts/EventFormContext';

interface ApproveButtonProps {
  event: Event;
}

const ApproveButton: React.FC<ApproveButtonProps> = ({ event }) => {
  const { onRefresh } = useContext(EventFormContext);
  const [{ loading, success }, approveEvent] = useBackendServiceCallback(
    eventService.approve,
  );

  const visibility = event.status === 'Chờ xử lý';

  const handleApprove = () => {
    approveEvent(event.id);
  };

  useDidUpdate(() => {
    if (success && onRefresh) {
      setTimeout(onRefresh, 500);
    }
  }, [success]);

  if (!visibility) return null;

  return (
    <Grid container alignItems="center">
      <Spin loading={loading} size={18}>
        <Tooltip title="Duyệt">
          <IconButton onClick={handleApprove}>
            <CheckIcon color="primary" />
          </IconButton>
        </Tooltip>
      </Spin>
    </Grid>
  );
};

export default ApproveButton;

import { Tooltip, IconButton, Grid } from '@material-ui/core';
import { Backspace as UnpublishIcon } from '@material-ui/icons';
import { useContext } from 'react';

import { Notification } from 'types/notification';
import Spin from 'ui/spin';
import useBackendServiceCallback from 'hooks/useBackendServiceCallback';
import notificationService from 'services/notification';
import useDidUpdate from 'hooks/useDidUpdate';
import NotificationDialogContext from '../../NotificationDialogContext';

interface UnpublishButtonProps {
  notification: Notification;
}

const UnpublishButton: React.FC<UnpublishButtonProps> = ({ notification }) => {
  const { onRefresh } = useContext(NotificationDialogContext);
  const [{ loading, success }, unpublishNotification] =
    useBackendServiceCallback(notificationService.unpublish);

  const visibility = notification.status === 'Đã đăng';

  const handleUnpublish = () => {
    unpublishNotification(notification.id);
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
        <Tooltip title="Gỡ">
          <IconButton onClick={handleUnpublish}>
            <UnpublishIcon color="primary" />
          </IconButton>
        </Tooltip>
      </Spin>
    </Grid>
  );
};

export default UnpublishButton;

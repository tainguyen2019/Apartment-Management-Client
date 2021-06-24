import { Tooltip, IconButton, Grid } from '@material-ui/core';
import { Public as PublishIcon } from '@material-ui/icons';
import { useContext } from 'react';

import { Notification } from 'types/notification';
import Spin from 'ui/spin';
import useBackendServiceCallback from 'hooks/useBackendServiceCallback';
import notificationService from 'services/notification';
import useDidUpdate from 'hooks/useDidUpdate';
import storageService from 'services/storage';
import NotificationDialogContext from '../../NotificationDialogContext';

interface PublishButtonProps {
  notification: Notification;
}

const PublishButton: React.FC<PublishButtonProps> = ({ notification }) => {
  const { onRefresh } = useContext(NotificationDialogContext);
  const [{ loading, success }, publishNotification] = useBackendServiceCallback(
    notificationService.publish,
  );
  const staffId = storageService.getItem<string>('staff_id') ?? '';
  const visibility = notification.status === 'Chưa đăng';

  const handlePublish = () => {
    publishNotification(notification.id, staffId);
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
        <Tooltip title="Đăng">
          <IconButton onClick={handlePublish}>
            <PublishIcon color="primary" />
          </IconButton>
        </Tooltip>
      </Spin>
    </Grid>
  );
};

export default PublishButton;

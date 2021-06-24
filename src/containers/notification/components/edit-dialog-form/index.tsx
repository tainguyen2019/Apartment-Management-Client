import { useContext } from 'react';
import { DefaultValues, SubmitHandler } from 'react-hook-form';

import { NotificationFormValues } from 'types/notification';

import notificationService from 'services/notification';
import useDidUpdate from 'hooks/useDidUpdate';
import useBackendServiceCallback from 'hooks/useBackendServiceCallback';

import NotificationDialogContext from '../../NotificationDialogContext';
import NotificationDialogForm from '../notification-dialog-form';

interface EditDialogFormProps {
  onClose: React.MouseEventHandler;
  onRefresh: VoidFunction;
}

const EditDialogForm: React.FC<EditDialogFormProps> = ({
  onClose,
  onRefresh,
}) => {
  const { open, notification } = useContext(NotificationDialogContext);
  const [{ loading, success }, updateNotification] = useBackendServiceCallback(
    notificationService.update,
  );

  useDidUpdate(() => {
    if (success) {
      setTimeout(onRefresh, 1000);
      setTimeout(onClose, 500);
    }
  }, [success]);

  if (!notification) return null;

  const handleSubmit: SubmitHandler<NotificationFormValues> = (values) => {
    updateNotification({
      ...values,
      id: notification!.id!,
    });
  };

  const { content, title } = notification;
  const initialValues: DefaultValues<NotificationFormValues> = {
    content,
    title,
  };

  return (
    <NotificationDialogForm
      key="edit-notification"
      mode="update"
      initialValues={initialValues}
      loading={loading}
      open={open}
      title="Cập nhật thông báo"
      onSubmit={handleSubmit}
      onClose={onClose}
    />
  );
};

export default EditDialogForm;

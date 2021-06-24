import React from 'react';
import { Button } from '@material-ui/core';
import { DefaultValues, SubmitHandler } from 'react-hook-form';

import useBackendServiceCallback from 'hooks/useBackendServiceCallback';
import useDidUpdate from 'hooks/useDidUpdate';
import useToggle from 'hooks/useToggle';
import notificationService from 'services/notification';
import { NotificationFormValues } from 'types/notification';

import NotificationDialogForm from '../notification-dialog-form';
import storageService from 'services/storage';

const initialValues: DefaultValues<NotificationFormValues> = {
  title: '',
  content: '',
  file: undefined,
};

interface InsertButtonProps {
  onRefresh: VoidFunction;
}

const CreateButton: React.FC<InsertButtonProps> = ({ onRefresh }) => {
  const [open, toggle] = useToggle();
  const [{ loading, success }, createNotification] = useBackendServiceCallback(
    notificationService.create,
  );

  const handleSubmit: SubmitHandler<NotificationFormValues> = ({
    content,
    title,
    file,
  }) => {
    const staffId = storageService.getItem<string>('staff_id') ?? '';
    createNotification({
      content,
      title,
      file: file?.[0],
      staff_id: staffId,
    });
  };

  useDidUpdate(() => {
    if (success) {
      setTimeout(onRefresh, 1000);
      setTimeout(toggle, 500);
    }
  }, [success]);

  return (
    <>
      <Button variant="outlined" size="medium" color="primary" onClick={toggle}>
        Thêm mới
      </Button>
      <NotificationDialogForm
        key={'insert-notification'}
        mode="create"
        initialValues={initialValues}
        loading={loading}
        open={open}
        title="Thêm mới thông báo"
        onClose={toggle}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default CreateButton;

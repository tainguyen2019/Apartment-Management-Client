import React from 'react';
import Button from '@material-ui/core/Button';
import dayjs from 'dayjs';

import useBackendServiceCallback from 'hooks/useBackendServiceCallback';
import useDidUpdate from 'hooks/useDidUpdate';
import useToggle from 'hooks/useToggle';
import eventService from 'services/event';
import { EventFormValues } from 'types/event';
import { SubmitHandler } from 'react-hook-form';
import storageService from 'services/storage';
import { FIELD_DATE_FORMAT } from 'constants/common';

import EventForm from '../event-dialog-form';

const initialValues: EventFormValues = {
  name: '',
  date: dayjs().format(FIELD_DATE_FORMAT),
  start_time: dayjs().format('HH:mm'),
  end_time: dayjs().format('HH:mm'),
};

interface CreateButtonProps {
  onRefresh: VoidFunction;
}

const CreateButton: React.FC<CreateButtonProps> = ({ onRefresh }) => {
  const [open, toggle] = useToggle();
  const [{ loading, success }, createEvent] = useBackendServiceCallback(
    eventService.create,
  );

  const handleCreateEvent: SubmitHandler<EventFormValues> = (values) => {
    const apartment_id = storageService.getItem<string>('apartment_id') || '';
    createEvent({ ...values, apartment_id });
  };

  useDidUpdate(() => {
    if (success) {
      setTimeout(toggle, 500);
      setTimeout(onRefresh, 1000);
    }
  }, [success]);

  return (
    <>
      <Button variant="outlined" color="primary" onClick={toggle}>
        Thêm mới
      </Button>
      <EventForm
        key={'insert-event'}
        title="Thêm mới sự kiện"
        open={open}
        loading={loading}
        initialValues={initialValues}
        onClose={toggle}
        onSubmit={handleCreateEvent}
      />
    </>
  );
};

export default CreateButton;

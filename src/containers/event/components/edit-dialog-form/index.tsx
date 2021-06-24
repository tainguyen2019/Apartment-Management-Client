import React, { useContext } from 'react';
import { SubmitHandler } from 'react-hook-form';
import dayjs from 'dayjs';

import eventService from 'services/event';
import useBackendServiceCallback from 'hooks/useBackendServiceCallback';
import useDidUpdate from 'hooks/useDidUpdate';
import { EventFormValues } from 'types/event';
import { FIELD_DATE_FORMAT } from 'constants/common';

import EventForm from '../event-dialog-form';
import EventDialogContext from '../../contexts/EventDialogContext';
import EventFormContext from 'containers/event/contexts/EventFormContext';

const EditForm: React.FC = () => {
  const { open, event, onClose } = useContext(EventDialogContext);
  const { onRefresh } = useContext(EventFormContext);
  const [{ loading, success }, updateEvent] = useBackendServiceCallback(
    eventService.update,
  );

  useDidUpdate(() => {
    if (success && onRefresh && onClose) {
      setTimeout(onRefresh, 1000);
      setTimeout(onClose, 500);
    }
  }, [success]);

  if (!event) return null;

  const { id, date, name, start_time, end_time } = event;
  const initialValues: EventFormValues = {
    name,
    start_time,
    end_time,
    date: dayjs(date).format(FIELD_DATE_FORMAT),
  };

  const onSubmit: SubmitHandler<EventFormValues> = (values) => {
    updateEvent({
      ...values,
      id: id!,
    });
  };

  return (
    <EventForm
      key={'edit-event'}
      title="Cập nhật sự kiện"
      initialValues={initialValues}
      open={open}
      loading={loading}
      onClose={onClose}
      onSubmit={onSubmit}
    />
  );
};

export default EditForm;

import { createContext } from 'react';
import { RecordEditor } from 'types/common';
import { Event } from 'types/event';

interface EventFormContextValues {
  onRefresh?: VoidFunction;
  onEdit?: RecordEditor<Event>;
  onCancel?: RecordEditor<Event>;
}

const EventFormContext = createContext<EventFormContextValues>({});

export default EventFormContext;

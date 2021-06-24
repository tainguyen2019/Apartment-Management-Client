import { createContext } from 'react';
import { RecordEditor } from 'types/common';
import { Reflect } from 'types/reflect';

interface ReflectFormContextValues {
  onRefresh?: VoidFunction;
  onEdit?: RecordEditor<Reflect>;
  onAnswer?: RecordEditor<Reflect>;
  onView?: RecordEditor<Reflect>;
}

const ReflectFormContext = createContext<ReflectFormContextValues>({});

export default ReflectFormContext;

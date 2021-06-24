import { createContext } from 'react';
import { RecordEditor } from 'types/common';
import { Absence } from 'types/absence';

interface AbsenceFormContextValues {
  onRefresh?: VoidFunction;
  onEdit?: RecordEditor<Absence>;
  onReject?: RecordEditor<Absence>;
}

const AbsenceFormContext = createContext<AbsenceFormContextValues>({});

export default AbsenceFormContext;

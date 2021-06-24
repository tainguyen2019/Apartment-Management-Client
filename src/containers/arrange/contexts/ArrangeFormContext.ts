import { createContext } from 'react';
import { RecordEditor } from 'types/common';
import { Arrange } from 'types/arrange';

interface ArrangeFormContextValues {
  onRefresh?: VoidFunction;
  onEdit?: RecordEditor<Arrange>;
}

const ArrangeFormContext = createContext<ArrangeFormContextValues>({});

export default ArrangeFormContext;

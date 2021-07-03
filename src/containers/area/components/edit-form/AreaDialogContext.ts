import { createContext } from 'react';
import { Area } from 'types/area';

type AreaDialogContextValues = {
  area?: Area;
  open: boolean;
};

const defaultValues: AreaDialogContextValues = { open: false };
const AreaDialogContext = createContext(defaultValues);

export default AreaDialogContext;

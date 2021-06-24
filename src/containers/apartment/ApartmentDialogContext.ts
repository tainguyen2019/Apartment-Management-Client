import { createContext } from 'react';
import { Apartment } from 'types/apartment';

type ApartmentDialogContextValues = {
  apartment?: Apartment;
  open: boolean;
};

const defaultValues: ApartmentDialogContextValues = { open: false };
const ApartmentDialogContext = createContext(defaultValues);

export default ApartmentDialogContext;

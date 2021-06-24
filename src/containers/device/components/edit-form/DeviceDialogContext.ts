import { createContext } from 'react';
import { Device } from 'types/device';

type DeviceDialogContextValues = {
  device?: Device;
  open: boolean;
};

const defaultValues: DeviceDialogContextValues = { open: false };
const DeviceDialogContext = createContext(defaultValues);

export default DeviceDialogContext;

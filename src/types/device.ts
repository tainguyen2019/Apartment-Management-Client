export interface BaseDevice {
  id: string;
  name: string;
  description: string;
}

export type EditDeviceValues = BaseDevice;
export type DeviceFormValues = OmitFrom<BaseDevice, 'id'>;
export type CreateDeviceValues = DeviceFormValues;

export type Device = BaseDevice;

export interface DeviceResponse {
  devices: Device[];
}

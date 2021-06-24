import { API_URL } from 'constants/common';
import {
  DeviceResponse,
  CreateDeviceValues,
  EditDeviceValues,
} from 'types/device';
import BackendService from './backend';

class DeviceService extends BackendService {
  constructor() {
    super({ baseURL: API_URL });
  }

  search = () => {
    return this.request<DeviceResponse>({
      url: '/v1/devices',
      method: 'GET',
    });
  };

  create = (device: CreateDeviceValues) => {
    return this.request<{ rowCount: number }>({
      url: '/v1/devices',
      method: 'POST',
      data: device,
      shouldNotifySuccess: true,
    });
  };

  update = (device: EditDeviceValues) => {
    const { id, ...values } = device;
    return this.request<{ rowCount: number }>({
      url: `/v1/devices/${id}`,
      method: 'PUT',
      data: values,
      shouldNotifySuccess: true,
    });
  };
}

export default new DeviceService();

import { API_URL } from 'constants/common';
import {
  SearchVehicleParams,
  VehicleResponse,
  CreateVehicleValues,
  EditVehicleValues,
  ApproveVehicleParams,
} from 'types/vehicle';
import { filterSearchParams } from 'utils/common';
import BackendService from './backend';

class VehicleService extends BackendService {
  constructor() {
    super({ baseURL: API_URL });
  }

  search = (params: SearchVehicleParams) => {
    const filteredParams = filterSearchParams(params);

    return this.request<VehicleResponse>({
      url: '/v1/vehicles',
      method: 'GET',
      params: filteredParams,
    });
  };

  create = (vehicle: CreateVehicleValues) => {
    return this.request<{ rowCount: number }>({
      url: '/v1/vehicles',
      method: 'POST',
      data: vehicle,
      shouldNotifySuccess: true,
    });
  };

  update = ({ id, ...values }: EditVehicleValues) => {
    return this.request<{ rowCount: number }>({
      url: `/v1/vehicles/${id}`,
      method: 'PUT',
      data: values,
      shouldNotifySuccess: true,
    });
  };

  approve = ({ id, parking_no }: ApproveVehicleParams) => {
    return this.request<{ rowCount: number }>({
      url: `/v1/vehicles/${id}/approve`,
      method: 'POST',
      data: {
        parking_no,
      },
      shouldNotifySuccess: true,
    });
  };

  cancel = (id: string) => {
    return this.request<{ rowCount: number }>({
      url: `/v1/vehicles/${id}/cancel`,
      method: 'POST',
      shouldNotifySuccess: true,
    });
  };

  restore = (id: string) => {
    return this.request<{ rowCount: number }>({
      url: `/v1/vehicles/${id}/restore`,
      method: 'POST',
      shouldNotifySuccess: true,
    });
  };
}

export default new VehicleService();

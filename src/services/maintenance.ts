import { API_URL } from 'constants/common';
import {
  MaintenanceResponse,
  SearchMaintenanceParams,
  CreateMaintenanceValues,
  EditMaintenanceValues,
} from 'types/maintenance';
import { filterSearchParams } from 'utils/common';
import BackendService from './backend';

class MaintenanceService extends BackendService {
  constructor() {
    super({ baseURL: API_URL });
  }

  search = (params: SearchMaintenanceParams) => {
    const filteredParams = filterSearchParams(params);

    return this.request<MaintenanceResponse>({
      url: '/v1/maintenances',
      method: 'GET',
      params: filteredParams,
    });
  };

  create = (maintenance: CreateMaintenanceValues) => {
    return this.request<{ rowCount: number }>({
      url: '/v1/maintenances',
      method: 'POST',
      data: maintenance,
      shouldNotifySuccess: true,
    });
  };

  update = (maintenance: EditMaintenanceValues) => {
    const { id, ...values } = maintenance;
    return this.request<{ rowCount: number }>({
      url: `/v1/maintenances/${id}`,
      method: 'PUT',
      data: values,
      shouldNotifySuccess: true,
    });
  };
}

export default new MaintenanceService();

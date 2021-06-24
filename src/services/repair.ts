import { API_URL } from 'constants/common';
import {
  RepairResponse,
  SearchRepairParams,
  CreateRepairValues,
  EditRepairValues,
} from 'types/repair';
import { filterSearchParams } from 'utils/common';
import BackendService from './backend';

class RepairService extends BackendService {
  constructor() {
    super({ baseURL: API_URL });
  }

  search = (params: SearchRepairParams) => {
    const filteredParams = filterSearchParams(params);

    return this.request<RepairResponse>({
      url: '/v1/repairs',
      method: 'GET',
      params: filteredParams,
    });
  };

  create = (repair: CreateRepairValues) => {
    return this.request<{ rowCount: number }>({
      url: '/v1/repairs',
      method: 'POST',
      data: repair,
      shouldNotifySuccess: true,
    });
  };

  update = (repair: EditRepairValues) => {
    const { id, ...values } = repair;
    return this.request<{ rowCount: number }>({
      url: `/v1/repairs/${id}`,
      method: 'PUT',
      data: values,
      shouldNotifySuccess: true,
    });
  };

  assignment = (id: string, staff_id: string) => {
    return this.request<{ rowCount: number }>({
      url: `/v1/repairs/${id}/assignment`,
      method: 'PUT',
      data: { staff_id },
      shouldNotifySuccess: true,
    });
  };

  rate = (id: string, rate: string) => {
    return this.request<{ rowCount: number }>({
      url: `/v1/repairs/${id}/rate`,
      method: 'PUT',
      data: { rate },
      shouldNotifySuccess: true,
    });
  };

  complete = (id: string) => {
    return this.request<{ rowCount: number }>({
      url: `/v1/repairs/${id}/complete`,
      method: 'PUT',
      shouldNotifySuccess: true,
    });
  };
}

export default new RepairService();

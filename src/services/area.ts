import { AreaResponse, CreateAreaValues, EditAreaValues } from 'types/area';
import BackendService from './backend';
import { API_URL } from '../constants/common';

class AreaService extends BackendService {
  constructor() {
    super({
      baseURL: API_URL,
    });
  }

  getAll = () => {
    return this.request<AreaResponse>({
      url: '/v1/areas',
      method: 'GET',
    });
  };

  create = (area: CreateAreaValues) => {
    return this.request<{ rowCount: number }>({
      url: '/v1/areas',
      method: 'POST',
      data: area,
      shouldNotifySuccess: true,
    });
  };

  update = (area: EditAreaValues) => {
    const { id, ...values } = area;
    return this.request<{ rowCount: number }>({
      url: `/v1/areas/${id}`,
      method: 'PUT',
      data: values,
      shouldNotifySuccess: true,
    });
  };
}

export default new AreaService();

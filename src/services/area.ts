import { AreaResponse } from 'types/area';
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
      cacheKey: 'areas',
    });
  };
}

export default new AreaService();

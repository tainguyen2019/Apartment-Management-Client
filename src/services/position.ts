import { PositionResponseData } from 'types/position';
import BackendService from './backend';
import { API_URL } from '../constants/common';

class PositionService extends BackendService {
  constructor() {
    super({
      baseURL: API_URL,
    });
  }

  search() {
    return this.request<PositionResponseData>({
      url: '/v1/positions',
      method: 'GET',
      cacheKey: 'positions',
    });
  }
}

export default new PositionService();

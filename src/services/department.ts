import { DepartmentResponse } from 'types/department';
import BackendService from './backend';
import { API_URL } from '../constants/common';

class DepartmentService extends BackendService {
  constructor() {
    super({
      baseURL: API_URL,
    });
  }

  getAll = () => {
    return this.request<DepartmentResponse>({
      url: '/v1/departments/getAll',
      method: 'GET',
      cacheKey: 'departments',
    });
  };
}

export default new DepartmentService();

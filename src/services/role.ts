import { API_URL } from 'constants/common';
import { RoleResponseData, SearchRoleParams } from 'types/role';
import { filterSearchParams } from 'utils/common';
import BackendService from './backend';

class RoleService extends BackendService {
  constructor() {
    super({
      baseURL: API_URL,
    });
  }

  search = (params: SearchRoleParams) => {
    const filteredParams = filterSearchParams(params);

    return this.request<RoleResponseData>({
      url: '/v1/roles',
      method: 'GET',
      params: filteredParams,
    });
  };

  getAll = () => {
    return this.request<RoleResponseData>({
      url: '/v1/roles',
      method: 'GET',
      params: {
        page: 1,
        pageSize: 50,
      },
      cacheKey: 'all-roles',
    });
  };
}

export default new RoleService();

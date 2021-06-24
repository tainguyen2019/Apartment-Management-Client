import { API_URL } from 'constants/common';
import {
  ArrangeResponse,
  SearchArrangeParams,
  CreateArrangeValues,
  EditArrangeValues,
} from 'types/arrange';
import { filterSearchParams } from 'utils/common';
import BackendService from './backend';

class ArrangeService extends BackendService {
  constructor() {
    super({ baseURL: API_URL });
  }

  search = (params: SearchArrangeParams) => {
    const filteredParams = filterSearchParams(params);

    return this.request<ArrangeResponse>({
      url: '/v1/arranges',
      method: 'GET',
      params: filteredParams,
    });
  };

  create = (arrange: CreateArrangeValues) => {
    return this.request<{ rowCount: number }>({
      url: '/v1/arranges',
      method: 'POST',
      data: arrange,
      shouldNotifySuccess: true,
    });
  };

  update = (arrange: EditArrangeValues) => {
    const { id, ...values } = arrange;
    return this.request<{ rowCount: number }>({
      url: `/v1/arranges/${id}`,
      method: 'PUT',
      data: values,
      shouldNotifySuccess: true,
    });
  };
}

export default new ArrangeService();

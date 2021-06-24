import { API_URL } from 'constants/common';
import { FeeResponse, CreateFeeValues, EditFeeValues } from 'types/fee';
import BackendService from './backend';

class FeeService extends BackendService {
  constructor() {
    super({ baseURL: API_URL });
  }

  search = () => {
    return this.request<FeeResponse>({
      url: '/v1/fees',
      method: 'GET',
    });
  };

  create = (fee: CreateFeeValues) => {
    return this.request<{ rowCount: number }>({
      url: '/v1/fees',
      method: 'POST',
      data: fee,
      shouldNotifySuccess: true,
    });
  };

  update = (fee: EditFeeValues) => {
    const { id, ...values } = fee;
    return this.request<{ rowCount: number }>({
      url: `/v1/fees/${id}`,
      method: 'PUT',
      data: values,
      shouldNotifySuccess: true,
    });
  };
}

export default new FeeService();

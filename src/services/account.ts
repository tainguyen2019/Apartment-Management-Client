import { API_URL } from 'constants/common';
import {
  AccountResponseData,
  SearchAccountParams,
  CreateAccountValues,
  UpdateAccountParams,
} from 'types/account';
import { filterSearchParams } from 'utils/common';
import BackendService from './backend';

class AccountService extends BackendService {
  constructor() {
    super({
      baseURL: API_URL,
    });
  }

  search = (params: SearchAccountParams) => {
    const filteredParams = filterSearchParams(params);

    return this.request<AccountResponseData>({
      url: '/v1/accounts',
      method: 'GET',
      params: filteredParams,
    });
  };

  create = (values: CreateAccountValues) => {
    return this.request<{ rowCount: number }>({
      url: `/v1/accounts`,
      method: 'POST',
      data: values,
      shouldNotifySuccess: true,
    });
  };

  update = ({ id, ...values }: UpdateAccountParams) => {
    return this.request<{ rowCount: number }>({
      url: `/v1/accounts/${id}`,
      method: 'PUT',
      data: values,
      shouldNotifySuccess: true,
    });
  };
}

export default new AccountService();

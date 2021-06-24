import { API_URL } from 'constants/common';
import {
  ApartmentResponseData,
  CreateApartmentValues,
  UpdateApartmentValues,
  SearchApartmentParams,
} from 'types/apartment';
import { filterSearchParams } from 'utils/common';
import BackendService from './backend';

class ApartmentService extends BackendService {
  constructor() {
    super({
      baseURL: API_URL,
    });
  }

  search = (params: SearchApartmentParams) => {
    const filteredParams = filterSearchParams(params);

    return this.request<ApartmentResponseData>({
      url: '/v1/apartments',
      method: 'GET',
      params: filteredParams,
    });
  };

  create = (data: CreateApartmentValues) => {
    // Excludes account_name
    const { account_name: _accountName, ...values } = data;
    return this.request<{ rowCount: number }>({
      url: `/v1/apartments`,
      method: 'POST',
      data: values,
      shouldNotifySuccess: true,
    });
  };

  update = (data: UpdateApartmentValues) => {
    // Excludes account_name
    const { id, account_name: _accountName, ...values } = data;
    return this.request<{ rowCount: number }>({
      url: `/v1/apartments/${id}`,
      method: 'PUT',
      data: values,
      shouldNotifySuccess: true,
    });
  };
}

export default new ApartmentService();

import { API_URL } from 'constants/common';
import {
  ShiftResponse,
  SearchShiftParams,
  CreateShiftValues,
  EditShiftValues,
} from 'types/shift';
import { filterSearchParams } from 'utils/common';
import BackendService from './backend';

class ShiftService extends BackendService {
  constructor() {
    super({ baseURL: API_URL });
  }

  search = (params: SearchShiftParams) => {
    const filteredParams = filterSearchParams(params);

    return this.request<ShiftResponse>({
      url: '/v1/shifts',
      method: 'GET',
      params: filteredParams,
    });
  };

  create = (shifts: CreateShiftValues) => {
    return this.request<{ rowCount: number }>({
      url: '/v1/shifts',
      method: 'POST',
      data: shifts,
      shouldNotifySuccess: true,
    });
  };

  update = (shift: EditShiftValues) => {
    const { id, ...values } = shift;
    return this.request<{ rowCount: number }>({
      url: `/v1/shifts/${id}`,
      method: 'PUT',
      data: values,
      shouldNotifySuccess: true,
    });
  };
}

export default new ShiftService();

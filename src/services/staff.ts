import { filterSearchParams } from 'utils/common';
import { API_URL } from 'constants/common';
import {
  CreateStaffValues,
  EditStaffValues,
  StaffResponse,
  SearchStaffParams,
  SelectStaffResponse,
} from 'types/staff';
import BackendService from './backend';

class StaffService extends BackendService {
  constructor() {
    super({
      baseURL: API_URL,
    });
  }

  search = (params: SearchStaffParams) => {
    const filteredParams = filterSearchParams(params);

    return this.request<StaffResponse>({
      url: '/v1/staffs',
      method: 'GET',
      params: filteredParams,
    });
  };

  // Excludes account_name
  create = ({ account_name: _accountName, ...values }: CreateStaffValues) => {
    return this.request<{ rowCount: number }>({
      url: `/v1/staffs`,
      method: 'POST',
      data: values,
      shouldNotifySuccess: true,
    });
  };

  // Excludes account_name
  update = ({ account_name: _accountName, ...values }: EditStaffValues) => {
    const { id, ...staffValues } = values;
    return this.request<{ rowCount: number }>({
      url: `/v1/staffs/${id}`,
      method: 'PUT',
      data: staffValues,
      shouldNotifySuccess: true,
    });
  };

  getShiftStaff = () => {
    return this.request<SelectStaffResponse>({
      url: '/v1/staffs/shift-staff',
      method: 'GET',
    });
  };

  getTechniqueStaff = () => {
    return this.request<SelectStaffResponse>({
      url: '/v1/staffs/technique-staff',
      method: 'GET',
    });
  };
}

export default new StaffService();

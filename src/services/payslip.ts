import { API_URL } from 'constants/common';
import {
  PayslipResponse,
  SearchPayslipParams,
  CreatePayslipValues,
  EditPayslipValues,
} from 'types/payslip';
import { filterSearchParams } from 'utils/common';
import BackendService from './backend';

class PayslipService extends BackendService {
  constructor() {
    super({
      baseURL: API_URL,
    });
  }

  search = (params: SearchPayslipParams) => {
    const filteredParams = filterSearchParams(params);

    return this.request<PayslipResponse>({
      url: '/v1/payslips',
      method: 'GET',
      params: filteredParams,
    });
  };

  create = (payslip: CreatePayslipValues) => {
    return this.request<{ rowCount: number }>({
      url: '/v1/payslips',
      method: 'POST',
      data: payslip,
      shouldNotifySuccess: true,
    });
  };

  update = (payslip: EditPayslipValues) => {
    const { id, ...values } = payslip;
    return this.request<{ rowCount: number }>({
      url: `/v1/Payslips/${id}`,
      method: 'PUT',
      data: values,
      shouldNotifySuccess: true,
    });
  };
}

export default new PayslipService();

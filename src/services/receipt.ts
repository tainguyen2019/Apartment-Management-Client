import { API_URL } from 'constants/common';
import {
  SearchReceiptParams,
  ReceiptResponse,
  ReceiptDetailResponse,
  ReceiptFormValues,
  GenerateReceiptParams,
  GenerateReceiptResponse,
} from 'types/receipt';
import { filterSearchParams } from 'utils/common';
import BackendService from './backend';

class ReceiptService extends BackendService {
  constructor() {
    super({ baseURL: API_URL });
  }

  search = (params: SearchReceiptParams) => {
    const filteredParams = filterSearchParams(params);

    return this.request<ReceiptResponse>({
      url: '/v1/receipts',
      method: 'GET',
      params: filteredParams,
    });
  };

  create = (receipt: ReceiptFormValues) => {
    return this.request<{ rowCount: number }>({
      url: '/v1/receipts',
      method: 'POST',
      data: receipt,
      shouldNotifySuccess: true,
    });
  };

  getDetails = (id: string) => {
    return this.request<ReceiptDetailResponse>({
      url: `/v1/receipts/${id}`,
      method: 'GET',
    });
  };

  approve = (id: string) => {
    return this.request<{ rowCount: number }>({
      url: `/v1/receipts/${id}/approve`,
      method: 'POST',
      shouldNotifySuccess: true,
    });
  };

  generate = (params: GenerateReceiptParams) => {
    return this.request<GenerateReceiptResponse>({
      url: '/v1/receipts/generate',
      method: 'POST',
      data: params,
      shouldNotifySuccess: true,
    });
  };

  delete = (id: string) => {
    return this.request<{ rowCount: number }>({
      url: `/v1/receipts/${id}`,
      method: 'DELETE',
      shouldNotifySuccess: true,
    });
  };
}

export default new ReceiptService();

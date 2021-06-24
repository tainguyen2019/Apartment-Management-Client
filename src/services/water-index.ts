import { API_URL } from 'constants/common';
import {
  WaterIndexResponseData,
  CreateWaterIndexValues,
  SearchWaterIndexParams,
  UpdateWaterIndexValues,
} from 'types/water-index';
import { filterSearchParams } from 'utils/common';
import BackendService from './backend';

class WaterIndexService extends BackendService {
  constructor() {
    super({
      baseURL: API_URL,
    });
  }

  search = (params: SearchWaterIndexParams) => {
    const filteredParams = filterSearchParams(params);

    return this.request<WaterIndexResponseData>({
      url: '/v1/water-index',
      method: 'GET',
      params: filteredParams,
    });
  };

  create = ({
    apartment_id,
    date,
    end_index,
    start_index,
  }: CreateWaterIndexValues) => {
    return this.request<{ rowCount: number }>({
      url: `/v1/water-index`,
      method: 'POST',
      data: {
        apartment_id,
        date,
        start_index,
        end_index,
      },
      shouldNotifySuccess: true,
    });
  };

  update = ({
    id,
    date,
    end_index,
    start_index,
    apartment_id,
  }: UpdateWaterIndexValues) => {
    return this.request<{ rowCount: number }>({
      url: `/v1/water-index/${id}`,
      method: 'PUT',
      data: {
        date,
        apartment_id,
        start_index,
        end_index,
      },
      shouldNotifySuccess: true,
    });
  };

  confirm = (id: string) => {
    return this.request<{ rowCount: number }>({
      url: `/v1/water-index/${id}/confirm`,
      method: 'POST',
      shouldNotifySuccess: true,
    });
  };
}

export default new WaterIndexService();

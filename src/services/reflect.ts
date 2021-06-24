import { API_URL } from 'constants/common';
import {
  ReflectResponse,
  SearchReflectParams,
  CreateReflectValues,
  EditReflectValues,
  AnswerReflectValues,
} from 'types/reflect';
import { filterSearchParams } from 'utils/common';
import BackendService from './backend';

class ReflectService extends BackendService {
  constructor() {
    super({
      baseURL: API_URL,
    });
  }

  search = (params: SearchReflectParams) => {
    const filteredParams = filterSearchParams(params);

    return this.request<ReflectResponse>({
      url: '/v1/reflects',
      method: 'GET',
      params: filteredParams,
    });
  };

  create = (reflect: CreateReflectValues) => {
    return this.request<{ rowCount: number }>({
      url: '/v1/reflects',
      method: 'POST',
      data: reflect,
      shouldNotifySuccess: true,
    });
  };

  update = (reflect: EditReflectValues) => {
    const { id, ...values } = reflect;
    return this.request<{ rowCount: number }>({
      url: `/v1/reflects/${id}`,
      method: 'PUT',
      data: values,
      shouldNotifySuccess: true,
    });
  };

  answer = ({ id, answer }: AnswerReflectValues) => {
    return this.request<{ rowCount: number }>({
      url: `/v1/reflects/${id}/answer`,
      method: 'POST',
      data: { answer },
      shouldNotifySuccess: true,
    });
  };
}

export default new ReflectService();

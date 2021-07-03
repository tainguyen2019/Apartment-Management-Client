import { API_URL } from 'constants/common';
import { filterSearchParams, generateFormData } from 'utils/common';
import {
  SearchNotificationParams,
  NotificationResponse,
  CreateNotificationValues,
  EditNotificationValues,
} from 'types/notification';
import BackendService from './backend';

class NotificationService extends BackendService {
  constructor() {
    super({ baseURL: API_URL });
  }

  search = (searchParams: SearchNotificationParams) => {
    const filteredParams = filterSearchParams(searchParams);
    return this.request<NotificationResponse>({
      url: '/v1/notifications',
      method: 'GET',
      params: filteredParams,
    });
  };

  create = (values: CreateNotificationValues) => {
    const formData = generateFormData(values);
    return this.request<{ rowCount: number }>({
      url: '/v1/notifications',
      method: 'POST',
      data: formData,
      shouldNotifySuccess: true,
    });
  };

  update = ({ id, ...values }: EditNotificationValues) => {
    return this.request<{ rowCount: number }>({
      url: `/v1/notifications/${id}`,
      method: 'PUT',
      data: values,
      shouldNotifySuccess: true,
    });
  };

  publish = (id: string, staff_id: string) => {
    return this.request<{ rowCount: number }>({
      url: `/v1/notifications/${id}/publish`,
      method: 'PUT',
      data: { staff_id },
      shouldNotifySuccess: true,
    });
  };

  unpublish = (id: string) => {
    return this.request<{ rowCount: number }>({
      url: `/v1/notifications/${id}/unpublish`,
      method: 'PUT',
      shouldNotifySuccess: true,
    });
  };
}

export default new NotificationService();

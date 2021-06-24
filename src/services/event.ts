import storageService from 'services/storage';
import { API_URL } from 'constants/common';
import {
  EventResponse,
  CreateEventValues,
  EditEventValues,
  SearchEventParams,
} from 'types/event';
import { filterSearchParams } from 'utils/common';
import BackendService from './backend';

class EventService extends BackendService {
  constructor() {
    super({
      baseURL: API_URL,
    });
  }

  search = (params: SearchEventParams) => {
    const filteredParams = filterSearchParams(params);

    return this.request<EventResponse>({
      url: '/v1/events',
      method: 'GET',
      params: filteredParams,
    });
  };

  create = (event: CreateEventValues) => {
    return this.request<{ rowCount: number }>({
      url: '/v1/events',
      method: 'POST',
      data: event,
      shouldNotifySuccess: true,
    });
  };

  update = (event: EditEventValues) => {
    const { id, ...values } = event;
    return this.request<{ rowCount: number }>({
      url: `/v1/events/${id}`,
      method: 'PUT',
      data: values,
      shouldNotifySuccess: true,
    });
  };

  approve = (id: string) => {
    const staffId = storageService.getItem<string>('staff_id');
    return this.request<{ rowCount: number }>({
      url: `/v1/events/${id}/approve`,
      method: 'POST',
      data: {
        approver_id: staffId,
      },
      shouldNotifySuccess: true,
    });
  };

  cancel = (id: string, note: string) => {
    return this.request<{ rowCount: number }>({
      url: `/v1/events/${id}/cancel`,
      method: 'POST',
      data: {
        note,
      },
      shouldNotifySuccess: true,
    });
  };
}

export default new EventService();

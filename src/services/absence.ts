import { API_URL } from 'constants/common';
import {
  SearchAbsenceParams,
  AbsenceResponseData,
  CreateAbsenceValues,
  UpdateAbsenceValues,
} from 'types/absence';
import BackendService from './backend';
import storageService from './storage';
import { filterSearchParams } from '../utils/common';

class AbsenceService extends BackendService {
  constructor() {
    super({
      baseURL: API_URL,
    });
  }

  search = (params: SearchAbsenceParams) => {
    const searchParams = filterSearchParams(params);

    return this.request<AbsenceResponseData>({
      url: '/v1/absences',
      method: 'GET',
      params: searchParams,
    });
  };

  create = ({ reason, date }: CreateAbsenceValues) => {
    const staffId = storageService.getItem<string>('staff_id');

    return this.request<{ rowCount: number }>({
      url: '/v1/absences',
      method: 'POST',
      data: {
        reason,
        date,
        staff_id: staffId,
      },
      shouldNotifySuccess: true,
    });
  };

  update = ({ id, date, reason }: UpdateAbsenceValues) => {
    return this.request<{ rowCount: number }>({
      url: `/v1/absences/${id}`,
      method: 'PUT',
      data: {
        reason,
        date,
      },
      shouldNotifySuccess: true,
    });
  };

  approve = (absenceId: string) => {
    const staffId = storageService.getItem<string>('staff_id');
    return this.request<{ rowCount: number }>({
      url: `/v1/absences/${absenceId}/approve`,
      method: 'POST',
      data: {
        approver_id: staffId,
      },
      shouldNotifySuccess: true,
    });
  };

  reject = (absenceId: string, note: string) => {
    const staffId = storageService.getItem<string>('staff_id');
    return this.request<{ rowCount: number }>({
      url: `/v1/absences/${absenceId}/reject`,
      method: 'POST',
      data: {
        note,
        approver_id: staffId,
      },
      shouldNotifySuccess: true,
    });
  };
}

export default new AbsenceService();

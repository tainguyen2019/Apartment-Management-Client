import { API_URL } from 'constants/common';

import BackendService from './backend';

class FileService extends BackendService {
  constructor() {
    super({ baseURL: API_URL });
  }

  downLoadFile = (fileName: string) => {
    return this.download({
      url: `/v1/files/${fileName}`,
      method: 'GET',
      shouldNotifySuccess: true,
    });
  };
}

export default new FileService();

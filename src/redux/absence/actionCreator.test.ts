import absenceService from 'services/absence';
import { AbsenceResponseData, SearchAbsenceParams } from 'types/absence';
import { BaseResponse } from 'types/common';
import { getAbsences, success, fail, request } from './actionCreators';

describe('absence creator', () => {
  describe('getAbsences', () => {
    const param: SearchAbsenceParams = { page: 1, pageSize: 5 };
    const mockDispatch = jest.fn();
    const spySearchAbsences = jest.spyOn(absenceService, 'search');

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should get absences success', async () => {
      const fakeResponse: BaseResponse<AbsenceResponseData> = {
        code: 200,
        kind: 'success',
        message: 'success',
        data: {
          absences: [],
          total: 0,
          totalPages: 0,
          page: 1,
          pageSize: 5,
        },
      };

      spySearchAbsences.mockResolvedValue(fakeResponse);
      await getAbsences(param)(mockDispatch);

      expect(mockDispatch).toBeCalledTimes(2);
      expect(mockDispatch).toHaveBeenCalledWith(request());
      expect(mockDispatch).toHaveBeenCalledWith(success(fakeResponse.data));
    });

    it('should get absences fail', async () => {
      const fakeResponse: BaseResponse<AbsenceResponseData> = {
        code: 401,
        kind: 'failed',
        message: 'Unauthorized',
        data: {},
      };

      spySearchAbsences.mockResolvedValue(fakeResponse);
      await getAbsences(param)(mockDispatch);

      expect(mockDispatch).toBeCalledTimes(2);
      expect(mockDispatch).toHaveBeenCalledWith(request());
      expect(mockDispatch).toHaveBeenCalledWith(fail(fakeResponse.message));
    });
  });
});

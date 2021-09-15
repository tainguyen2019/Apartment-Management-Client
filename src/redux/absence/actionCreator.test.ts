import absenceService from 'services/absence';
import { AbsenceResponseData, SearchAbsenceParams } from 'types/absence';
import { BaseResponse } from 'types/common';
import { getAbsences, success, fail, request } from './actionCreators';
import { actionTypes } from './actionTypes';

describe('absence creator', () => {
  const fakeSuccessResponse: BaseResponse<AbsenceResponseData> = {
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

  describe('request', () => {
    it('should return correct action', () => {
      expect(request()).toStrictEqual({ type: actionTypes.request });
      // toEqual : ==; toStrictEqual: ===;
    });
  });

  describe('success', () => {
    it('should return correct action', () => {
      expect(success(fakeSuccessResponse.data)).toStrictEqual({
        type: actionTypes.success,
        payload: fakeSuccessResponse.data,
      });
    });
  });

  describe('fail', () => {
    it('should return correct action', () => {
      const errorMessage = 'UnAuthorized';
      expect(fail(errorMessage)).toStrictEqual({
        type: actionTypes.fail,
        payload: { errorMessage },
      });
    });
  });

  describe('getAbsences', () => {
    const param: SearchAbsenceParams = { page: 1, pageSize: 5 };
    const mockDispatch = jest.fn();
    const spySearchAbsences = jest.spyOn(absenceService, 'search');

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should get absences success', async () => {
      spySearchAbsences.mockResolvedValue(fakeSuccessResponse);
      await getAbsences(param)(mockDispatch);

      expect(mockDispatch).toBeCalledTimes(2);
      expect(mockDispatch).toHaveBeenCalledWith(request());
      expect(mockDispatch).toHaveBeenCalledWith(
        success(fakeSuccessResponse.data),
      );
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

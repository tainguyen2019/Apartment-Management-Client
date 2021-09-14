import absenceReducer, { AbsenceState } from './reducer';
import { actionTypes } from './actionTypes';
import { request } from './actionCreators';

describe('absence reducer', () => {
  describe(actionTypes.request, () => {
    it('should return correct state', () => {
      const state: AbsenceState = { loading: false };
      const action = request();
      const nextState = absenceReducer(state, action);

      expect(nextState.loading).toEqual(true);
    });
  });
});

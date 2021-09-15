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

/* Testing file name:
  1***. filename.test.extension
  2. filename.spec.extension
  3***. __tests__/filename.extension
  4. __tests__/filename.test.extension
  5. __tests__/filename.spec.extension
*/

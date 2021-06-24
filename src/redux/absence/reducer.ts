import { AsyncState } from 'types/state';
import { AbsenceResponseData } from 'types/absence';
import { PayloadAction } from '../types';
import { actionTypes } from './actionTypes';

export type AbsenceState = AsyncState<AbsenceResponseData>;

const getInitialState = (): AbsenceState => ({ loading: false });

const absenceReducer = (
  prevState = getInitialState(),
  action: PayloadAction<any>,
): AbsenceState => {
  switch (action.type) {
    case actionTypes.request:
      return {
        ...prevState,
        loading: true,
        errorMessage: undefined,
        data: undefined,
      };
    case actionTypes.success: {
      const data = action.payload as AbsenceResponseData;
      return {
        ...prevState,
        loading: false,
        errorMessage: undefined,
        data,
      };
    }
    case actionTypes.fail: {
      const { errorMessage } = action.payload;
      return {
        ...prevState,
        loading: false,
        data: undefined,
        errorMessage,
      };
    }
    default:
      return prevState;
  }
};

export default absenceReducer;

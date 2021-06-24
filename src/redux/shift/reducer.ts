import { ShiftResponse } from 'types/shift';
import { AsyncState } from 'types/state';
import { PayloadAction } from '../types';
import { actionTypes } from './actionTypes';

export type ShiftState = AsyncState<ShiftResponse>;

const getInitialState = (): ShiftState => ({ loading: false });

const shiftReducer = (
  prevState = getInitialState(),
  action: PayloadAction<any>,
): ShiftState => {
  switch (action.type) {
    case actionTypes.request:
      return {
        ...prevState,
        loading: true,
        errorMessage: undefined,
        data: undefined,
      };
    case actionTypes.success: {
      const data = action.payload as ShiftResponse;
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

export default shiftReducer;

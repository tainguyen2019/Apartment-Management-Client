import { AsyncState } from 'types/state';
import { SelectStaffResponse } from 'types/staff';
import { PayloadAction } from '../types';
import { actionTypes } from './actionTypes';

export type ShiftStaffState = AsyncState<SelectStaffResponse>;

const getInitialState = (): ShiftStaffState => ({ loading: false });

const shiftStaffReducer = (
  prevState = getInitialState(),
  action: PayloadAction<any>,
): ShiftStaffState => {
  switch (action.type) {
    case actionTypes.request:
      return {
        ...prevState,
        loading: true,
        errorMessage: undefined,
        data: undefined,
      };
    case actionTypes.success: {
      const data = action.payload as SelectStaffResponse;
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

export default shiftStaffReducer;

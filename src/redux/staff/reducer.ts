import { AsyncState } from 'types/state';
import { StaffResponse } from 'types/staff';
import { PayloadAction } from '../types';
import { actionTypes } from './actionTypes';

export type StaffState = AsyncState<StaffResponse>;

const getInitialState = (): StaffState => ({ loading: false });

const staffReducer = (
  prevState = getInitialState(),
  action: PayloadAction<any>,
): StaffState => {
  switch (action.type) {
    case actionTypes.request:
      return {
        ...prevState,
        loading: true,
        errorMessage: undefined,
        data: undefined,
      };
    case actionTypes.success: {
      const data = action.payload as StaffResponse;
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

export default staffReducer;

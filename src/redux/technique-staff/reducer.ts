import { AsyncState } from 'types/state';
import { SelectStaffResponse } from 'types/staff';
import { PayloadAction } from '../types';
import { actionTypes } from './actionTypes';

export type TechiniqueStaffState = AsyncState<SelectStaffResponse>;

const getInitialState = (): TechiniqueStaffState => ({ loading: false });

const techniqueStaffReducer = (
  prevState = getInitialState(),
  action: PayloadAction<any>,
): TechiniqueStaffState => {
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

export default techniqueStaffReducer;

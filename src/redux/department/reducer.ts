import { AsyncState } from 'types/state';
import { DepartmentResponse } from 'types/department';
import { PayloadAction } from '../types';
import { actionTypes } from './actionTypes';

export type DepartmentState = AsyncState<DepartmentResponse>;

const getInitialState = (): DepartmentState => ({ loading: false });

const departmentReducer = (
  prevState = getInitialState(),
  action: PayloadAction<any>,
): DepartmentState => {
  switch (action.type) {
    case actionTypes.request:
      return {
        ...prevState,
        loading: true,
        errorMessage: undefined,
        data: undefined,
      };
    case actionTypes.success: {
      const data = action.payload as DepartmentResponse;
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

export default departmentReducer;

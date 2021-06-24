import { AsyncState } from 'types/state';
import { RoleResponseData } from 'types/role';
import { PayloadAction } from '../types';
import { actionTypes } from './actionTypes';

export type RoleState = AsyncState<RoleResponseData>;

const getInitialState = (): RoleState => ({ loading: false });

const roleReducer = (
  prevState = getInitialState(),
  action: PayloadAction<any>,
): RoleState => {
  switch (action.type) {
    case actionTypes.request:
      return {
        ...prevState,
        loading: true,
        errorMessage: undefined,
        data: undefined,
      };
    case actionTypes.success: {
      const data = action.payload as RoleResponseData;
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

export default roleReducer;

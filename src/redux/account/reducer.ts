import { AsyncState } from 'types/state';
import { AccountResponseData } from 'types/account';
import { PayloadAction } from '../types';
import { actionTypes } from './actionTypes';

export type AccountState = AsyncState<AccountResponseData>;

const getInitialState = (): AccountState => ({ loading: false });

const accountReducer = (
  prevState = getInitialState(),
  action: PayloadAction<any>,
): AccountState => {
  switch (action.type) {
    case actionTypes.request:
      return {
        ...prevState,
        loading: true,
        errorMessage: undefined,
        data: undefined,
      };
    case actionTypes.success: {
      const data = action.payload as AccountResponseData;
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

export default accountReducer;

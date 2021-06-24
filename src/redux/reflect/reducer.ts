import { ReflectResponse } from 'types/reflect';
import { actionTypes } from './actionTypes';
import { AsyncState } from 'types/state';
import { PayloadAction } from '../types';

export type ReflectState = AsyncState<ReflectResponse>;

const getInitialState = (): ReflectState => ({ loading: false });

const reflectReducer = (
  prevState = getInitialState(),
  action: PayloadAction<any>,
): ReflectState => {
  switch (action.type) {
    case actionTypes.request:
      return {
        ...prevState,
        loading: true,
        errorMessage: undefined,
        data: undefined,
      };
    case actionTypes.success: {
      const data = action.payload as ReflectResponse;
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

export default reflectReducer;

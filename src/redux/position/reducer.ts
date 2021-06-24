import { AsyncState } from 'types/state';
import { PositionResponseData } from 'types/position';
import { PayloadAction } from '../types';
import { actionTypes } from './actionTypes';

export type PositionState = AsyncState<PositionResponseData>;

const getInitialState = (): PositionState => ({ loading: false });

const positionReducer = (
  prevState = getInitialState(),
  action: PayloadAction<any>,
): PositionState => {
  switch (action.type) {
    case actionTypes.request:
      return {
        ...prevState,
        loading: true,
        errorMessage: undefined,
        data: undefined,
      };
    case actionTypes.success: {
      const data = action.payload as PositionResponseData;
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

export default positionReducer;

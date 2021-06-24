import { AsyncState } from 'types/state';
import { AreaResponse } from 'types/area';
import { PayloadAction } from '../types';
import { actionTypes } from './actionTypes';

export type AreaState = AsyncState<AreaResponse>;

const getInitialState = (): AreaState => ({ loading: false });

const areaReducer = (
  prevState = getInitialState(),
  action: PayloadAction<any>,
): AreaState => {
  switch (action.type) {
    case actionTypes.request:
      return {
        ...prevState,
        loading: true,
        errorMessage: undefined,
        data: undefined,
      };
    case actionTypes.success: {
      const data = action.payload as AreaResponse;
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

export default areaReducer;

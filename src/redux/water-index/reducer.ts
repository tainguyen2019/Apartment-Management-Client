import { AsyncState } from 'types/state';
import { WaterIndexResponseData } from 'types/water-index';
import { PayloadAction } from '../types';
import { actionTypes } from './actionTypes';

export type WaterIndexState = AsyncState<WaterIndexResponseData>;

const getInitialState = (): WaterIndexState => ({ loading: false });

const waterIndexReducer = (
  prevState = getInitialState(),
  action: PayloadAction<any>,
): WaterIndexState => {
  switch (action.type) {
    case actionTypes.request:
      return {
        ...prevState,
        loading: true,
        errorMessage: undefined,
        data: undefined,
      };
    case actionTypes.success: {
      const data = action.payload as WaterIndexResponseData;
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

export default waterIndexReducer;

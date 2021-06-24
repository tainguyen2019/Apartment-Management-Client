import { DeviceResponse } from 'types/device';
import { AsyncState } from 'types/state';
import { PayloadAction } from '../types';
import { actionTypes } from './actionTypes';

export type DeviceState = AsyncState<DeviceResponse>;

const getInitialState = (): DeviceState => ({ loading: false });

const deviceReducer = (
  prevState = getInitialState(),
  action: PayloadAction<any>,
): DeviceState => {
  switch (action.type) {
    case actionTypes.request:
      return {
        ...prevState,
        loading: true,
        errorMessage: undefined,
        data: undefined,
      };
    case actionTypes.success: {
      const data = action.payload as DeviceResponse;
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

export default deviceReducer;

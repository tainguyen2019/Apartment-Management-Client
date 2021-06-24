import { VehicleResponse } from 'types/vehicle';
import { actionTypes } from './actionTypes';
import { AsyncState } from 'types/state';
import { PayloadAction } from '../types';

export type VehicleState = AsyncState<VehicleResponse>;

const getInitialState = (): VehicleState => ({ loading: false });

const vehicleReducer = (
  prevState = getInitialState(),
  action: PayloadAction<any>,
): VehicleState => {
  switch (action.type) {
    case actionTypes.request:
      return {
        ...prevState,
        loading: true,
        errorMessage: undefined,
        data: undefined,
      };
    case actionTypes.success: {
      const data = action.payload as VehicleResponse;
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

export default vehicleReducer;

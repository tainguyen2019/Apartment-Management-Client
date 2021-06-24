import { MaintenanceResponse } from 'types/maintenance';
import { AsyncState } from 'types/state';
import { PayloadAction } from '../types';
import { actionTypes } from './actionTypes';

export type MaintenanceState = AsyncState<MaintenanceResponse>;

const getInitialState = (): MaintenanceState => ({ loading: false });

const maintenanceReducer = (
  prevState = getInitialState(),
  action: PayloadAction<any>,
): MaintenanceState => {
  switch (action.type) {
    case actionTypes.request:
      return {
        ...prevState,
        loading: true,
        errorMessage: undefined,
        data: undefined,
      };
    case actionTypes.success: {
      const data = action.payload as MaintenanceResponse;
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

export default maintenanceReducer;

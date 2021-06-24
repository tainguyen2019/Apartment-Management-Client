import { AsyncState } from 'types/state';
import { ApartmentResponseData } from 'types/apartment';
import { PayloadAction } from '../types';
import { actionTypes } from './actionTypes';

export type ApartmentState = AsyncState<ApartmentResponseData>;

const getInitialState = (): ApartmentState => ({ loading: false });

const apartmentReducer = (
  prevState = getInitialState(),
  action: PayloadAction<any>,
): ApartmentState => {
  switch (action.type) {
    case actionTypes.request:
      return {
        ...prevState,
        loading: true,
        errorMessage: undefined,
        data: undefined,
      };
    case actionTypes.success: {
      const data = action.payload as ApartmentResponseData;
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

export default apartmentReducer;

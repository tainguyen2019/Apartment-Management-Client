import { EventResponse } from 'types/event';
import { actionTypes } from './actionTypes';
import { AsyncState } from 'types/state';
import { PayloadAction } from '../types';

export type EventState = AsyncState<EventResponse>;

const getInitialState = (): EventState => ({ loading: false });

const eventReducer = (
  prevState = getInitialState(),
  action: PayloadAction<any>,
): EventState => {
  switch (action.type) {
    case actionTypes.request:
      return {
        ...prevState,
        loading: true,
        errorMessage: undefined,
        data: undefined,
      };
    case actionTypes.success: {
      const data = action.payload as EventResponse;
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

export default eventReducer;

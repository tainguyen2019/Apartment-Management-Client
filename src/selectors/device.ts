import { RootState } from 'redux/rootReducer';

export const selectDeviceState = (state: RootState) => {
  const { loading, data, errorMessage } = state.device;
  const devices = data?.devices ?? [];

  return { loading, errorMessage, devices };
};

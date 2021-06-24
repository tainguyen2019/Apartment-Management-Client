import { RootState } from 'redux/rootReducer';

export const selectVehicleState = (state: RootState) => {
  const { loading, data, errorMessage } = state.vehicle;
  const vehicles = data?.vehicles ?? [];
  const totalPages = data?.totalPages ?? 0;

  return { loading, errorMessage, vehicles, totalPages };
};

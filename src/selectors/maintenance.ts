import { RootState } from 'redux/rootReducer';

export const selectMaintenanceState = (state: RootState) => {
  const { loading, data, errorMessage } = state.maintenance;
  const maintenances = data?.maintenances ?? [];
  const totalPages = data?.totalPages ?? 0;

  return { loading, errorMessage, maintenances, totalPages };
};

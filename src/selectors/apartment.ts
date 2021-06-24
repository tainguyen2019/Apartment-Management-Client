import { RootState } from 'redux/rootReducer';

export const selectApartmentState = (state: RootState) => {
  const { loading, data, errorMessage } = state.apartment;
  const apartments = data?.apartments ?? [];
  const totalPages = data?.totalPages ?? 0;

  return { loading, errorMessage, apartments, totalPages };
};

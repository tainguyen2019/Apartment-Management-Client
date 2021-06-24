import { RootState } from 'redux/rootReducer';

export const selectAbsenceState = (state: RootState) => {
  const { loading, data, errorMessage } = state.absence;
  const absences = data?.absences ?? [];
  const totalPages = data?.totalPages ?? 0;

  return { loading, errorMessage, absences, totalPages };
};

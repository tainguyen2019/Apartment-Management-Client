import { useEffect, useMemo, useState, useCallback } from 'react';
import { Grid, TableContainer, Paper } from '@material-ui/core';
import { useForm, DefaultValues, SubmitHandler } from 'react-hook-form';

import MyTable from 'components/common/my-table';
import SearchForm from 'components/common/search-form';
import Spin from 'ui/spin';
import MyPagination from 'components/common/my-pagination';
import AppContent from 'components/app/app-content';

import usePagination from 'hooks/usePagination';
import useActions from 'hooks/useActions';
import useDidUpdate from 'hooks/useDidUpdate';
import useShallowEqualSelector from 'hooks/useShallowEqualSelector';
import useToggle from 'hooks/useToggle';

import * as actionCreators from 'redux/absence/actionCreators';
import { selectAbsenceState } from 'selectors/absence';
import { appPaths } from 'routes/paths';
import { Absence, AbsenceSearchFormValues } from 'types/absence';
import Restriction from 'components/common/restriction';
import { PRIVILEGES } from 'constants/users';

import EditAbsenceDialogContext from './context/AbsenceDialogContext';
import RejectAbsenceDialogContext from './context/RejectAbsenceDialogContext';
import EditDialogForm from './components/edit-dialog-form';
import RejectDialogForm from './components/reject-dialog-form';
import CreateButton from './components/create-button';
import AbsenceSearchForm from './components/absence-search-form';
import { createAbsenceCols } from './utils';
import { useStyles } from './styles';
import AbsenceFormContext from './context/AbsenceFormContext';

const defaultSearchValues: DefaultValues<AbsenceSearchFormValues> = {
  staff_name: '',
  department_id: 'Tất cả',
  from_date: '',
  to_date: '',
  status: 'Tất cả',
};

const AbsencePage: React.FC = () => {
  const classes = useStyles();
  const [getAbsences] = useActions(actionCreators.getAbsences);
  const { page, pageSize, handleChangePagination } = usePagination();
  const [isOpenEditForm, toggleEditForm] = useToggle();
  const [isOpenRejectForm, toggleRejectForm] = useToggle();
  const [selectedAbsence, setSelectedAbsence] = useState<Absence>();
  const { loading, absences, totalPages } =
    useShallowEqualSelector(selectAbsenceState);
  const {
    control,
    handleSubmit: submitForm,
    reset,
  } = useForm<AbsenceSearchFormValues>({
    defaultValues: defaultSearchValues,
  });

  const handleEdit = (absence: Absence) => () => {
    setSelectedAbsence(absence);
    toggleEditForm();
  };

  const handleCloseEdit = () => {
    setSelectedAbsence(undefined);
    toggleEditForm();
  };

  const handleReject = (absence: Absence) => () => {
    setSelectedAbsence(absence);
    toggleRejectForm();
  };

  const handleCloseReject = () => {
    setSelectedAbsence(undefined);
    toggleRejectForm();
  };

  const apartmentCols = useMemo(
    () => createAbsenceCols(page, pageSize),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [page, pageSize],
  );

  const fetchAbsences = useCallback<SubmitHandler<AbsenceSearchFormValues>>(
    (values) => {
      getAbsences({
        ...values,
        page,
        pageSize,
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [page, pageSize],
  );

  const handleSubmit = useMemo(
    () =>
      submitForm((values) => {
        // Call fetch absences
        if (page === 1) {
          fetchAbsences(values);
        }
        // Reset page to 1 and called later in the useEffect 'page'
        else {
          handleChangePagination(1, pageSize);
        }
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [fetchAbsences],
  );

  const handleReset = () => {
    reset(defaultSearchValues);
    setTimeout(handleSubmit);
  };

  // Call on did mount and update page
  useEffect(() => {
    submitForm(fetchAbsences)();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  // Call on update page size
  useDidUpdate(() => {
    // Call submit form to get absences in case page = 1
    if (page === 1) {
      submitForm(fetchAbsences)();
    }
    // Change page to 1 and it will be revoked in the above useEffect 'page'
    else {
      handleChangePagination(1, pageSize);
    }
  }, [pageSize]);

  return (
    <AppContent title={appPaths.absence.title}>
      <Spin loading={loading}>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <SearchForm onSubmit={handleSubmit} onReset={handleReset}>
              <AbsenceSearchForm control={control} />
            </SearchForm>
          </Grid>
          <AbsenceFormContext.Provider
            value={{
              onRefresh: handleSubmit,
              onEdit: handleEdit,
              onReject: handleReject,
            }}
          >
            <Grid item>
              <Restriction privilege={PRIVILEGES.createAbsence.value}>
                <CreateButton />
              </Restriction>
            </Grid>
            <TableContainer component={Paper}>
              <MyTable data={absences} columns={apartmentCols} />
            </TableContainer>
            <EditAbsenceDialogContext.Provider
              value={{
                open: isOpenEditForm,
                absence: selectedAbsence,
                onClose: handleCloseEdit,
              }}
            >
              <EditDialogForm />
            </EditAbsenceDialogContext.Provider>
            <RejectAbsenceDialogContext.Provider
              value={{
                open: isOpenRejectForm,
                absence: selectedAbsence,
                onClose: handleCloseReject,
              }}
            >
              <RejectDialogForm />
            </RejectAbsenceDialogContext.Provider>
          </AbsenceFormContext.Provider>
          {absences.length > 0 && (
            <Grid item>
              <MyPagination
                classes={{
                  ul: classes.ulPagination,
                }}
                variant="outlined"
                shape="rounded"
                count={totalPages}
                page={page}
                pageSize={pageSize}
                onChange={handleChangePagination}
              />
            </Grid>
          )}
        </Grid>
      </Spin>
    </AppContent>
  );
};

export default AbsencePage;

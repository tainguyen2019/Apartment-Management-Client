import { useEffect, useMemo, useState, useCallback } from 'react';
import { Grid, TableContainer, Paper } from '@material-ui/core';
import { useForm, DefaultValues, SubmitHandler } from 'react-hook-form';

import Spin from 'ui/spin';
import MyTable from 'components/common/my-table';
import SearchForm from 'components/common/search-form';
import MyPagination from 'components/common/my-pagination';
import AppContent from 'components/app/app-content';
import usePagination from 'hooks/usePagination';
import useActions from 'hooks/useActions';
import useDidUpdate from 'hooks/useDidUpdate';
import useShallowEqualSelector from 'hooks/useShallowEqualSelector';
import useToggle from 'hooks/useToggle';
import * as actionCreators from 'redux/shift/actionCreators';
import { selectShiftState } from 'selectors/shift';
import { Shift, ShiftSearchFormValues } from 'types/shift';
import { appPaths } from 'routes/paths';
import { PRIVILEGES } from 'constants/users';
import Restriction from 'components/common/restriction';

import ShiftDialogContext from './ShiftDialogContext';
import EditDialogForm from './components/edit-dialog-form';
import CreateButton from './components/create-button';
import ShiftSearchForm from './components/shift-search-form';
import { createShiftCols } from './utils';
import { useStyles } from './styles';

const defaultSearchValues: DefaultValues<ShiftSearchFormValues> = {
  description: '',
  staff_name: '',
  area_id: 'Tất cả',
  shift: 'Tất cả',
  department_name: 'Tất cả',
};

const ShiftPage: React.FC = () => {
  const classes = useStyles();
  const [getShifts] = useActions(actionCreators.getShifts);
  const { page, pageSize, handleChangePagination } = usePagination();
  const [isOpenEditForm, toggleEditForm] = useToggle();
  const [selectedShift, setSelectedShift] = useState<Shift>();
  const { loading, shifts, totalPages } =
    useShallowEqualSelector(selectShiftState);
  const {
    control,
    handleSubmit: submitForm,
    reset,
  } = useForm<ShiftSearchFormValues>({
    defaultValues: defaultSearchValues,
  });

  const handleEdit = (shift: Shift) => () => {
    setSelectedShift(shift);
    toggleEditForm();
  };

  const handleClose = () => {
    setSelectedShift(undefined);
    toggleEditForm();
  };

  const shiftCols = useMemo(
    () => createShiftCols(handleEdit, page, pageSize),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [page, pageSize],
  );

  const fetchStaffs = useCallback<SubmitHandler<ShiftSearchFormValues>>(
    (values) => {
      getShifts({
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
        // Call fetch staffs
        if (page === 1) {
          fetchStaffs(values);
        }
        // Reset page to 1 and called later in the useEffect 'page'
        else {
          handleChangePagination(1, pageSize);
        }
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [fetchStaffs],
  );

  const handleReset = () => {
    reset(defaultSearchValues);
    setTimeout(handleSubmit);
  };

  // Call on did mount and update page
  useEffect(() => {
    submitForm(fetchStaffs)();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  // Call on update page size
  useDidUpdate(() => {
    // Call submit form to get staff in case page = 1
    if (page === 1) {
      submitForm(fetchStaffs)();
    }
    // Change page to 1 and it will be revoked in the above useEffect 'page'
    else {
      handleChangePagination(1, pageSize);
    }
  }, [pageSize]);

  return (
    <AppContent title={appPaths.shift.title}>
      <Spin loading={loading}>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <SearchForm onSubmit={handleSubmit} onReset={handleReset}>
              <ShiftSearchForm control={control} />
            </SearchForm>
          </Grid>
          <Grid item>
            <Restriction privilege={PRIVILEGES.createShift.value}>
              <CreateButton onRefresh={handleSubmit} />
            </Restriction>
          </Grid>
          <Grid item>
            <ShiftDialogContext.Provider
              value={{ open: isOpenEditForm, shift: selectedShift }}
            >
              <TableContainer component={Paper}>
                <MyTable data={shifts} columns={shiftCols} />
              </TableContainer>
              <EditDialogForm onClose={handleClose} onRefresh={handleSubmit} />
            </ShiftDialogContext.Provider>
          </Grid>
          {shifts.length > 0 && (
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

export default ShiftPage;

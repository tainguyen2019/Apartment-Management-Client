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

import * as actionCreators from 'redux/staff/actionCreators';
import { selectStaffState } from 'selectors/staff';

import { Staff, StaffSearchFormValues } from 'types/staff';
import { appPaths } from 'routes/paths';
import Restriction from 'components/common/restriction';
import { PRIVILEGES } from 'constants/users';

import StaffDialogContext from './StaffDialogContext';
import EditDialogForm from './components/edit-dialog-form';
import CreateButton from './components/create-button';
import StaffSearchForm from './components/staff-search-form';
import { createStaffCols } from './utils';
import { useStyles } from './styles';

const defaultSearchValues: DefaultValues<StaffSearchFormValues> = {
  name: '',
  phone: '',
  email: '',
  department_id: 'Tất cả',
  status: 'Tất cả',
};

const StaffPage: React.FC = () => {
  const classes = useStyles();
  const [getStaffs] = useActions(actionCreators.getStaffs);
  const { page, pageSize, handleChangePagination } = usePagination();
  const [isOpenEditForm, toggleEditForm] = useToggle();
  const [selectedStaff, setSelectedStaff] = useState<Staff>();
  const { loading, staffs, totalPages } =
    useShallowEqualSelector(selectStaffState);
  const {
    control,
    handleSubmit: submitForm,
    reset,
  } = useForm<StaffSearchFormValues>({
    defaultValues: defaultSearchValues,
  });

  const handleEdit = (staff: Staff) => () => {
    setSelectedStaff(staff);
    toggleEditForm();
  };

  const handleClose = () => {
    setSelectedStaff(undefined);
    toggleEditForm();
  };

  const staffCols = useMemo(
    () => createStaffCols(handleEdit, page, pageSize),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [page, pageSize],
  );

  const fetchStaffs = useCallback<SubmitHandler<StaffSearchFormValues>>(
    (values) => {
      getStaffs({
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
    <AppContent title={appPaths.staff.title}>
      <Spin loading={loading}>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <SearchForm onSubmit={handleSubmit} onReset={handleReset}>
              <StaffSearchForm control={control} />
            </SearchForm>
          </Grid>
          <Grid item>
            <Restriction privilege={PRIVILEGES.createStaff.value}>
              <CreateButton onRefresh={handleSubmit} />
            </Restriction>
          </Grid>
          <Grid item>
            <StaffDialogContext.Provider
              value={{ open: isOpenEditForm, staff: selectedStaff }}
            >
              <TableContainer component={Paper}>
                <MyTable data={staffs} columns={staffCols} />
              </TableContainer>
              <EditDialogForm onClose={handleClose} onRefresh={handleSubmit} />
            </StaffDialogContext.Provider>
          </Grid>
          {staffs.length > 0 && (
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

export default StaffPage;

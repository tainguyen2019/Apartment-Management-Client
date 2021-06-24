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
import * as actionCreators from 'redux/repair/actionCreators';
import { selectRepairState } from 'selectors/repair';
import { Repair, RepairSearchFormValues } from 'types/repair';
import { appPaths } from 'routes/paths';
import { PRIVILEGES } from 'constants/users';
import Restriction from 'components/common/restriction';

import RepairFormContext from './contexts/RepairFormContext';
import EditRepairDialogContext from './contexts/EditRepairDialogContext';
import AssignmentDialogContext from './contexts/AssignmentDialogContext';
import RateDialogContext from './contexts/RateDialogContext';
import EditDialogForm from './components/edit-dialog-form';
import RateDialogForm from './components/rate-dialog-form';
import CreateButton from './components/create-button';
import AssignmentDialogForm from './components/assignment-dialog-form';
import RepairSearchForm from './components/repair-search-form';
import { createRepairCols } from './utils';
import { useStyles } from './styles';

const defaultSearchValues: DefaultValues<RepairSearchFormValues> = {
  apartment_number: '',
  block_number: '',
  content: '',
  staff_name: '',
  rate: 'Tất cả',
  status: 'Tất cả',
};

const RepairPage: React.FC = () => {
  const classes = useStyles();
  const [getRepairs] = useActions(actionCreators.getRepairs);
  const { page, pageSize, handleChangePagination } = usePagination();
  const [isOpenEditForm, toggleEditForm] = useToggle();
  const [isOpenAssignmentForm, toggleAssignmentForm] = useToggle();
  const [isOpenRateForm, toggleRateForm] = useToggle();
  const [selectedRepair, setSelectedRepair] = useState<Repair>();
  const { loading, repairs, totalPages } =
    useShallowEqualSelector(selectRepairState);
  const {
    control,
    handleSubmit: submitForm,
    reset,
  } = useForm<RepairSearchFormValues>({
    defaultValues: defaultSearchValues,
  });

  const handleEdit = (repair: Repair) => () => {
    setSelectedRepair(repair);
    toggleEditForm();
  };

  const handleCloseEdit = () => {
    setSelectedRepair(undefined);
    toggleEditForm();
  };

  const handleAssignment = (repair: Repair) => () => {
    setSelectedRepair(repair);
    toggleAssignmentForm();
  };

  const handleCloseAssignment = () => {
    setSelectedRepair(undefined);
    toggleAssignmentForm();
  };

  const handleRate = (repair: Repair) => () => {
    setSelectedRepair(repair);
    toggleRateForm();
  };

  const handleCloseRate = () => {
    setSelectedRepair(undefined);
    toggleRateForm();
  };

  const RepairCols = useMemo(
    () => createRepairCols(page, pageSize),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [page, pageSize],
  );

  const fetchRepairs = useCallback<SubmitHandler<RepairSearchFormValues>>(
    (values) => {
      getRepairs({
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
        // Call fetch Repairs
        if (page === 1) {
          fetchRepairs(values);
        }
        // Reset page to 1 and called later in the useEffect 'page'
        else {
          handleChangePagination(1, pageSize);
        }
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [fetchRepairs],
  );

  const handleReset = () => {
    reset(defaultSearchValues);
    setTimeout(handleSubmit);
  };

  // Call on did mount and update page
  useEffect(() => {
    submitForm(fetchRepairs)();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  // Call on update page size
  useDidUpdate(() => {
    // Call submit form to get Repair in case page = 1
    if (page === 1) {
      submitForm(fetchRepairs)();
    }
    // Change page to 1 and it will be revoked in the above useEffect 'page'
    else {
      handleChangePagination(1, pageSize);
    }
  }, [pageSize]);

  return (
    <AppContent title={appPaths.repair().title}>
      <Spin loading={loading}>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <SearchForm onSubmit={handleSubmit} onReset={handleReset}>
              <RepairSearchForm control={control} />
            </SearchForm>
          </Grid>
          <Grid item>
            <Restriction privilege={PRIVILEGES.createRepair.value}>
              <CreateButton onRefresh={handleSubmit} />
            </Restriction>
          </Grid>
          <Grid item>
            <RepairFormContext.Provider
              value={{
                onRefresh: handleSubmit,
                onEdit: handleEdit,
                onAssignment: handleAssignment,
                onRate: handleRate,
              }}
            >
              <TableContainer component={Paper}>
                <MyTable data={repairs} columns={RepairCols} />
              </TableContainer>
              <EditRepairDialogContext.Provider
                value={{
                  open: isOpenEditForm,
                  repair: selectedRepair,
                  onClose: handleCloseEdit,
                }}
              >
                <EditDialogForm />
              </EditRepairDialogContext.Provider>
              <RateDialogContext.Provider
                value={{
                  open: isOpenRateForm,
                  repair: selectedRepair,
                  onClose: handleCloseRate,
                }}
              >
                <RateDialogForm />
              </RateDialogContext.Provider>
              <AssignmentDialogContext.Provider
                value={{
                  open: isOpenAssignmentForm,
                  repair: selectedRepair,
                  onClose: handleCloseAssignment,
                }}
              >
                <AssignmentDialogForm />
              </AssignmentDialogContext.Provider>
            </RepairFormContext.Provider>
          </Grid>
          {repairs.length > 0 && (
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

export default RepairPage;

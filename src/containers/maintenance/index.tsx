import { useEffect, useMemo, useState, useCallback } from 'react';
import { Grid, TableContainer, Paper } from '@material-ui/core';
import { useForm, DefaultValues, SubmitHandler } from 'react-hook-form';

import MyTable from 'components/common/my-table';
import SearchForm from 'components/common/search-form';
import Spin from 'ui/spin';
import MyPagination from 'components/common/my-pagination';
import usePagination from 'hooks/usePagination';
import useActions from 'hooks/useActions';
import useDidUpdate from 'hooks/useDidUpdate';
import useShallowEqualSelector from 'hooks/useShallowEqualSelector';
import useToggle from 'hooks/useToggle';
import * as actionCreators from 'redux/maintenance/actionCreators';
import { selectMaintenanceState } from 'selectors/maintenance';
import { Maintenance, MaintenanceSearchFormValues } from 'types/maintenance';
import AppContent from 'components/app/app-content';
import { appPaths } from 'routes/paths';
import Restriction from 'components/common/restriction';
import { PRIVILEGES } from 'constants/users';

import MaintenanceFormContext from './contexts/MaintenaceFormContext';
import MaintenanceDialogContext from './contexts/MaintenceDialogContext';
import EditDialogForm from './components/edit-dialog-form';
import CreateButton from './components/create-button';
import MaintenanceSearchForm from './components/maintenance-search-form';
import { createMaintenanceCols } from './utils';
import { useStyles } from './styles';

const defaultSearchValues: DefaultValues<MaintenanceSearchFormValues> = {
  staff_name: '',
  device_name: '',
  area_id: 'Tất cả',
};

const MaintenancePage: React.FC = () => {
  const classes = useStyles();
  const [getMaintenances] = useActions(actionCreators.getMaintenances);
  const { page, pageSize, handleChangePagination } = usePagination();
  const [isOpenEditForm, toggleEditForm] = useToggle();
  const [selectedMaintenance, setSelectedMaintenance] = useState<Maintenance>();
  const { loading, maintenances, totalPages } = useShallowEqualSelector(
    selectMaintenanceState,
  );
  const {
    control,
    handleSubmit: submitForm,
    reset,
  } = useForm<MaintenanceSearchFormValues>({
    defaultValues: defaultSearchValues,
  });

  const handleEdit = (Maintenance: Maintenance) => () => {
    setSelectedMaintenance(Maintenance);
    toggleEditForm();
  };

  const handleCloseEdit = () => {
    setSelectedMaintenance(undefined);
    toggleEditForm();
  };

  const maintenanceCols = useMemo(
    () => createMaintenanceCols(page, pageSize),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [page, pageSize],
  );

  const fetchMaintenances = useCallback<
    SubmitHandler<MaintenanceSearchFormValues>
  >(
    (values) => {
      getMaintenances({
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
        // Call fetch Maintenances
        if (page === 1) {
          fetchMaintenances(values);
        }
        // Reset page to 1 and called later in the useEffect 'page'
        else {
          handleChangePagination(1, pageSize);
        }
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [fetchMaintenances],
  );

  const handleReset = () => {
    reset(defaultSearchValues);
    setTimeout(handleSubmit);
  };

  // Call on did mount and update page
  useEffect(() => {
    submitForm(fetchMaintenances)();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  // Call on update page size
  useDidUpdate(() => {
    // Call submit form to get Maintenance in case page = 1
    if (page === 1) {
      submitForm(fetchMaintenances)();
    }
    // Change page to 1 and it will be revoked in the above useEffect 'page'
    else {
      handleChangePagination(1, pageSize);
    }
  }, [pageSize]);

  return (
    <AppContent title={appPaths.maintenance.title}>
      <Spin loading={loading}>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <SearchForm onSubmit={handleSubmit} onReset={handleReset}>
              <MaintenanceSearchForm control={control} />
            </SearchForm>
          </Grid>
          <Grid item>
            <Restriction privilege={PRIVILEGES.createMaintenance.value}>
              <CreateButton onRefresh={handleSubmit} />
            </Restriction>
          </Grid>
          <Grid item>
            <MaintenanceFormContext.Provider
              value={{
                onEdit: handleEdit,
                onRefresh: handleSubmit,
              }}
            >
              <TableContainer component={Paper}>
                <MyTable data={maintenances} columns={maintenanceCols} />
              </TableContainer>
              <MaintenanceDialogContext.Provider
                value={{
                  open: isOpenEditForm,
                  maintenance: selectedMaintenance,
                  onClose: handleCloseEdit,
                }}
              >
                <EditDialogForm />
              </MaintenanceDialogContext.Provider>
            </MaintenanceFormContext.Provider>
          </Grid>
          {maintenances.length > 0 && (
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

export default MaintenancePage;

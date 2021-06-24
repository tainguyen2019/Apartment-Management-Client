import { useEffect, useMemo, useState, useCallback } from 'react';
import { Grid, TableContainer, Paper } from '@material-ui/core';
import { useForm, DefaultValues, SubmitHandler } from 'react-hook-form';

import MyTable from 'components/common/my-table';
import SearchForm from 'components/common/search-form';
import MyPagination from 'components/common/my-pagination';
import AppContent from 'components/app/app-content';
import Spin from 'ui/spin';

import usePagination from 'hooks/usePagination';
import useActions from 'hooks/useActions';
import useDidUpdate from 'hooks/useDidUpdate';
import useShallowEqualSelector from 'hooks/useShallowEqualSelector';
import useToggle from 'hooks/useToggle';

import * as actionCreators from 'redux/vehicle/actionCreators';
import { selectVehicleState } from 'selectors/vehicle';
import { Vehicle, VehicleSearchFormValues } from 'types/vehicle';
import { appPaths } from 'routes/paths';
import { PRIVILEGES } from 'constants/users';
import Restriction from 'components/common/restriction';

import ApproveVehicleDialogContext from './context/ApproveVehicleDialogContext';
import EditVehicleDialogContext from './context/EditVehicleDialogContext';
import CancelVehicleDialogContext from './context/CancelVehicleDialogContext';
import VehicleFormContext from './context/VehicleFormContext';
import EditDialogForm from './components/edit-dialog-form';
import CancelDialogForm from './components/cancel-dialog-form';
import CreateButton from './components/create-button';
import VehicleSearchForm from './components/vehicle-search-form';
import ApproveDialogForm from './components/approve-dialog-form';

import { createVehicleCols } from './utils';
import { useStyles } from './styles';

const defaultSearchValues: DefaultValues<VehicleSearchFormValues> = {
  plate_number: '',
  block_number: '',
  apartment_number: '',
  identity_card_number: '',
  parking_no: '',
  status: 'Tất cả',
  type: 'Tất cả',
};

const VehiclePage: React.FC = () => {
  const classes = useStyles();
  const [getVehicles] = useActions(actionCreators.getVehicles);
  const { page, pageSize, handleChangePagination } = usePagination();
  const [isOpenEditForm, toggleEditForm] = useToggle();
  const [isOpenApproveForm, toggleApproveForm] = useToggle();
  const [isOpenCancelForm, toggleCancelForm] = useToggle();
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle>();
  const { loading, vehicles, totalPages } =
    useShallowEqualSelector(selectVehicleState);
  const {
    control,
    handleSubmit: submitForm,
    reset,
  } = useForm<VehicleSearchFormValues>({
    defaultValues: defaultSearchValues,
  });

  const handleEdit = useCallback(
    (vehicle: Vehicle) => () => {
      setSelectedVehicle(vehicle);
      toggleEditForm();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const handleApprove = useCallback(
    (vehicle: Vehicle) => () => {
      setSelectedVehicle(vehicle);
      toggleApproveForm();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const handleCloseEdit = useCallback(() => {
    setSelectedVehicle(undefined);
    toggleEditForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCloseApprove = useCallback(() => {
    setSelectedVehicle(undefined);
    toggleApproveForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCancel = useCallback(
    (vehicle: Vehicle) => () => {
      setSelectedVehicle(vehicle);
      toggleCancelForm();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const handleCloseCancel = useCallback(() => {
    setSelectedVehicle(undefined);
    toggleCancelForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const vehicleCols = useMemo(
    () => createVehicleCols(page, pageSize),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [page, pageSize],
  );

  const fetchVehicles = useCallback<SubmitHandler<VehicleSearchFormValues>>(
    (values) => {
      getVehicles({
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
        // Call fetch Vehicles
        if (page === 1) {
          fetchVehicles(values);
        }
        // Reset page to 1 and called later in the useEffect 'page'
        else {
          handleChangePagination(1, pageSize);
        }
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [fetchVehicles],
  );

  const handleReset = useCallback(() => {
    reset(defaultSearchValues);
    setTimeout(handleSubmit);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Call on did mount and update page
  useEffect(() => {
    submitForm(fetchVehicles)();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  // Call on update page size
  useDidUpdate(() => {
    // Call submit form to get Vehicle in case page = 1
    if (page === 1) {
      submitForm(fetchVehicles)();
    }
    // Change page to 1 and it will be revoked in the above useEffect 'page'
    else {
      handleChangePagination(1, pageSize);
    }
  }, [pageSize]);

  return (
    <AppContent title={appPaths.vehicle.title}>
      <Spin loading={loading}>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <SearchForm onSubmit={handleSubmit} onReset={handleReset}>
              <VehicleSearchForm control={control} />
            </SearchForm>
          </Grid>
          <VehicleFormContext.Provider
            value={{
              onEdit: handleEdit,
              onRefresh: handleSubmit,
              onApprove: handleApprove,
              onCancel: handleCancel,
            }}
          >
            <Grid item>
              <Restriction privilege={PRIVILEGES.createVehicle.value}>
                <CreateButton />
              </Restriction>
            </Grid>
            <Grid item>
              <TableContainer component={Paper}>
                <MyTable data={vehicles} columns={vehicleCols} />
              </TableContainer>
            </Grid>
            <EditVehicleDialogContext.Provider
              value={{
                open: isOpenEditForm,
                vehicle: selectedVehicle,
                onClose: handleCloseEdit,
              }}
            >
              <EditDialogForm />
            </EditVehicleDialogContext.Provider>
            <ApproveVehicleDialogContext.Provider
              value={{
                open: isOpenApproveForm,
                vehicle: selectedVehicle,
                onClose: handleCloseApprove,
              }}
            >
              <ApproveDialogForm />
            </ApproveVehicleDialogContext.Provider>
            <CancelVehicleDialogContext.Provider
              value={{
                open: isOpenCancelForm,
                vehicle: selectedVehicle,
                onClose: handleCloseCancel,
              }}
            >
              <CancelDialogForm />
            </CancelVehicleDialogContext.Provider>
          </VehicleFormContext.Provider>
          {vehicles.length > 0 && (
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

export default VehiclePage;

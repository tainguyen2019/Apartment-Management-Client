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

import * as actionCreators from 'redux/apartment/actionCreators';
import { selectApartmentState } from 'selectors/apartment';
import { appPaths } from 'routes/paths';
import { Apartment, ApartmentSearchFormValues } from 'types/apartment';
import Restriction from 'components/common/restriction';
import { PRIVILEGES } from 'constants/users';

import ApartmentDialogContext from './ApartmentDialogContext';
import EditDialogForm from './components/edit-dialog-form';
import CreateButton from './components/create-button';
import ApartmentSearchForm from './components/apartment-search-form';
import { createApartmentCols } from './utils';
import { useStyles } from './styles';

const defaultSearchValues: DefaultValues<ApartmentSearchFormValues> = {
  apartment_number: '',
  block_number: '',
  email: '',
  phone: '',
  host: '',
  type: 'Tất cả',
};

const ApartmentPage: React.FC = () => {
  const classes = useStyles();
  const [getApartments] = useActions(actionCreators.getApartments);
  const { page, pageSize, handleChangePagination } = usePagination();
  const [isOpenEditForm, toggleEditForm] = useToggle();
  const [selectedApartment, setSelectedApartment] = useState<Apartment>();
  const { loading, apartments, totalPages } =
    useShallowEqualSelector(selectApartmentState);
  const {
    control,
    handleSubmit: submitForm,
    reset,
  } = useForm<ApartmentSearchFormValues>({
    defaultValues: defaultSearchValues,
  });

  const handleEdit = (apartment: Apartment) => () => {
    setSelectedApartment(apartment);
    toggleEditForm();
  };

  const handleClose = () => {
    setSelectedApartment(undefined);
    toggleEditForm();
  };

  const apartmentCols = useMemo(
    () => createApartmentCols(handleEdit, page, pageSize),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [page, pageSize],
  );

  const fetchApartments = useCallback<SubmitHandler<ApartmentSearchFormValues>>(
    (values) => {
      getApartments({
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
        // Call fetch apartments
        if (page === 1) {
          fetchApartments(values);
        }
        // Reset page to 1 and called later in the useEffect 'page'
        else {
          handleChangePagination(1, pageSize);
        }
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [fetchApartments],
  );

  const handleReset = () => {
    reset(defaultSearchValues);
    setTimeout(handleSubmit);
  };

  // Call on did mount and update page
  useEffect(() => {
    submitForm(fetchApartments)();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  // Call on update page size
  useDidUpdate(() => {
    // Call submit form to get apartment in case page = 1
    if (page === 1) {
      submitForm(fetchApartments)();
    }
    // Change page to 1 and it will be revoked in the above useEffect 'page'
    else {
      handleChangePagination(1, pageSize);
    }
  }, [pageSize]);

  return (
    <AppContent title={appPaths.apartment().title}>
      <Spin loading={loading}>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <SearchForm onSubmit={handleSubmit} onReset={handleReset}>
              <ApartmentSearchForm control={control} />
            </SearchForm>
          </Grid>
          <Grid item>
            <Restriction privilege={PRIVILEGES.createApartment.value}>
              <CreateButton onRefresh={handleSubmit} />
            </Restriction>
          </Grid>
          <Grid item>
            <ApartmentDialogContext.Provider
              value={{ open: isOpenEditForm, apartment: selectedApartment }}
            >
              <TableContainer component={Paper}>
                <MyTable data={apartments} columns={apartmentCols} />
              </TableContainer>
              <EditDialogForm onClose={handleClose} onRefresh={handleSubmit} />
            </ApartmentDialogContext.Provider>
          </Grid>
          {apartments.length > 0 && (
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

export default ApartmentPage;

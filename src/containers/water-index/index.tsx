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

import * as actionCreators from 'redux/water-index/actionCreators';
import { selectWaterIndexState } from 'selectors/water-index';
import { appPaths } from 'routes/paths';

import { WaterIndex, WaterIndexSearchFormValues } from 'types/water-index';
import { PRIVILEGES } from 'constants/users';
import Restriction from 'components/common/restriction';

import WaterIndexDialogContext from './contexts/WaterIndexDialogContext';
import EditDialogForm from './components/edit-dialog-form';
import CreateButton from './components/create-button';
import WaterIndexSearchForm from './components/water-index-search-form';
import WaterIndexFormContext from './contexts/WaterIndexFormContext';
import { createWaterIndexCols } from './utils';
import { useStyles } from './styles';

const defaultSearchValues: DefaultValues<WaterIndexSearchFormValues> = {
  apartment_id: '',
  block_number: '',
  apartment_number: '',
  from_date: '',
  to_date: '',
  status: 'Tất cả',
};

const WaterIndexPage: React.FC = () => {
  const classes = useStyles();
  const [searchWaterIndex] = useActions(actionCreators.search);
  const { page, pageSize, handleChangePagination } = usePagination();
  const [isOpenEditForm, toggleEditForm] = useToggle();
  const [selectedApartment, setSelectedApartment] = useState<WaterIndex>();
  const { loading, waterIndexes, totalPages } = useShallowEqualSelector(
    selectWaterIndexState,
  );
  const {
    control,
    reset,
    handleSubmit: submitForm,
  } = useForm<WaterIndexSearchFormValues>({
    defaultValues: defaultSearchValues,
  });

  const handleEdit = (apartment: WaterIndex) => () => {
    setSelectedApartment(apartment);
    toggleEditForm();
  };

  const handleClose = () => {
    setSelectedApartment(undefined);
    toggleEditForm();
  };

  const waterIndexCols = useMemo(
    () => createWaterIndexCols(page, pageSize),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [page, pageSize],
  );

  const handleSearchWaterIndexes = useCallback<
    SubmitHandler<WaterIndexSearchFormValues>
  >(
    (values) => {
      searchWaterIndex({
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
          handleSearchWaterIndexes(values);
        }
        // Reset page to 1 and called later in the useEffect 'page'
        else {
          handleChangePagination(1, pageSize);
        }
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [handleSearchWaterIndexes],
  );

  const handleReset = () => {
    reset(defaultSearchValues);
    setTimeout(handleSubmit);
  };

  // Call on did mount and update page
  useEffect(() => {
    submitForm(handleSearchWaterIndexes)();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  // Call on update page size
  useDidUpdate(() => {
    // Call submit form to get apartment in case page = 1
    if (page === 1) {
      submitForm(handleSearchWaterIndexes)();
    }
    // Change page to 1 and it will be revoked in the above useEffect 'page'
    else {
      handleChangePagination(1, pageSize);
    }
  }, [pageSize]);

  return (
    <AppContent title={appPaths.waterIndex.title}>
      <Spin loading={loading}>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <SearchForm onSubmit={handleSubmit} onReset={handleReset}>
              <WaterIndexSearchForm control={control} />
            </SearchForm>
          </Grid>
          <WaterIndexFormContext.Provider
            value={{ onEdit: handleEdit, onRefresh: handleSubmit }}
          >
            <Grid item>
              <Restriction privilege={PRIVILEGES.createWaterIndex.value}>
                <CreateButton onRefresh={handleSubmit} />
              </Restriction>
            </Grid>
            <Grid item>
              <TableContainer component={Paper}>
                <MyTable data={waterIndexes} columns={waterIndexCols} />
              </TableContainer>
            </Grid>
            <WaterIndexDialogContext.Provider
              value={{
                open: isOpenEditForm,
                waterIndex: selectedApartment,
                onClose: handleClose,
              }}
            >
              <EditDialogForm />
            </WaterIndexDialogContext.Provider>
          </WaterIndexFormContext.Provider>
          {waterIndexes.length > 0 && (
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

export default WaterIndexPage;

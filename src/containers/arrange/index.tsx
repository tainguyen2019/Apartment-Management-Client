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
import * as actionCreators from 'redux/arrange/actionCreators';
import { selectArrangeState } from 'selectors/arrange';
import { Arrange, ArrangeSearchFormValues } from 'types/arrange';
import AppContent from 'components/app/app-content';
import { appPaths } from 'routes/paths';
import { PRIVILEGES } from 'constants/users';
import Restriction from 'components/common/restriction';

import ArrangeFormContext from './contexts/ArrangeFormContext';
import ArrangeDialogContext from './contexts/ArrangeDialogContext';
import EditDialogForm from './components/edit-dialog-form';
import CreateButton from './components/create-button';
import ArrangeSearchForm from './components/arrange-search-form';
import { createArrangeCols } from './utils';
import { useStyles } from './styles';

const defaultSearchValues: DefaultValues<ArrangeSearchFormValues> = {
  device_name: '',
  area_id: 'Tất cả',
};

const ArrangePage: React.FC = () => {
  const classes = useStyles();
  const [getArranges] = useActions(actionCreators.getArranges);
  const { page, pageSize, handleChangePagination } = usePagination();
  const [isOpenEditForm, toggleEditForm] = useToggle();
  const [selectedArrange, setSelectedArrange] = useState<Arrange>();
  const { loading, arranges, totalPages } =
    useShallowEqualSelector(selectArrangeState);
  const {
    control,
    handleSubmit: submitForm,
    reset,
  } = useForm<ArrangeSearchFormValues>({
    defaultValues: defaultSearchValues,
  });

  const handleEdit = (Arrange: Arrange) => () => {
    setSelectedArrange(Arrange);
    toggleEditForm();
  };

  const handleCloseEdit = () => {
    setSelectedArrange(undefined);
    toggleEditForm();
  };

  const ArrangeCols = useMemo(
    () => createArrangeCols(page, pageSize),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [page, pageSize],
  );

  const fetchArranges = useCallback<SubmitHandler<ArrangeSearchFormValues>>(
    (values) => {
      getArranges({
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
        // Call fetch Arranges
        if (page === 1) {
          fetchArranges(values);
        }
        // Reset page to 1 and called later in the useEffect 'page'
        else {
          handleChangePagination(1, pageSize);
        }
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [fetchArranges],
  );

  const handleReset = () => {
    reset(defaultSearchValues);
    setTimeout(handleSubmit);
  };

  // Call on did mount and update page
  useEffect(() => {
    submitForm(fetchArranges)();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  // Call on update page size
  useDidUpdate(() => {
    // Call submit form to get Arrange in case page = 1
    if (page === 1) {
      submitForm(fetchArranges)();
    }
    // Change page to 1 and it will be revoked in the above useEffect 'page'
    else {
      handleChangePagination(1, pageSize);
    }
  }, [pageSize]);

  return (
    <AppContent title={appPaths.arrange.title}>
      <Spin loading={loading}>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <SearchForm onSubmit={handleSubmit} onReset={handleReset}>
              <ArrangeSearchForm control={control} />
            </SearchForm>
          </Grid>
          <Grid item>
            <Restriction privilege={PRIVILEGES.createDeviceArrange.value}>
              <CreateButton onRefresh={handleSubmit} />
            </Restriction>
          </Grid>
          <Grid item>
            <ArrangeFormContext.Provider
              value={{
                onEdit: handleEdit,
                onRefresh: handleSubmit,
              }}
            >
              <TableContainer component={Paper}>
                <MyTable data={arranges} columns={ArrangeCols} />
              </TableContainer>
              <ArrangeDialogContext.Provider
                value={{
                  open: isOpenEditForm,
                  arrange: selectedArrange,
                  onClose: handleCloseEdit,
                }}
              >
                <EditDialogForm />
              </ArrangeDialogContext.Provider>
            </ArrangeFormContext.Provider>
          </Grid>
          {arranges.length > 0 && (
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

export default ArrangePage;

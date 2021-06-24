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
import * as actionCreators from 'redux/receipt/actionCreators';
import { selectReceiptState } from 'selectors/receipt';
import { appPaths } from 'routes/paths';
import { Receipt, ReceiptSearchFormValues } from 'types/receipt';
import Restriction from 'components/common/restriction';
import { PRIVILEGES } from 'constants/users';

import ReceiptFormContext from './contexts/ReceiptFormContext';
import ViewReceiptDialogContext from './contexts/ViewReceiptDialogContext';
import DeleteReceiptDialogContext from './contexts/DeleteReceiptDialogContext';

import ViewDialogForm from './components/view-dialog-form';
import CreateButtonManual from './components/create-button-manual';
import CreateButtonGenerate from './components/create-button-generate';
import ReceiptSearchForm from './components/receipt-search-form';
import DeleteDialogForm from './components/delete-dialog-form';
import { createReceiptCols } from './utils';

import { useStyles } from './styles';

const defaultSearchValues: DefaultValues<ReceiptSearchFormValues> = {
  apartment_number: '',
  block_number: '',
  content: '',
  status: 'Tất cả',
};

const ReceiptPage: React.FC = () => {
  const classes = useStyles();
  const [getReceipts] = useActions(actionCreators.getReceipts);
  const { page, pageSize, handleChangePagination } = usePagination();
  const [isOpenView, toggleViewForm] = useToggle();
  const [isOpenDelete, toggleDeleteForm] = useToggle();
  const [selectedReceipt, setSelectedReceipt] = useState<Receipt>();
  const { loading, receipts, totalPages } =
    useShallowEqualSelector(selectReceiptState);
  const {
    control,
    handleSubmit: submitForm,
    reset,
  } = useForm<ReceiptSearchFormValues>({
    defaultValues: defaultSearchValues,
  });

  const handleView = (Receipt: Receipt) => () => {
    setSelectedReceipt(Receipt);
    toggleViewForm();
  };

  const handleCloseView = () => {
    setSelectedReceipt(undefined);
    toggleViewForm();
  };

  const handleDelete = (Receipt: Receipt) => () => {
    setSelectedReceipt(Receipt);
    toggleDeleteForm();
  };

  const handleCloseDelete = () => {
    setSelectedReceipt(undefined);
    toggleDeleteForm();
  };

  const ReceiptCols = useMemo(
    () => createReceiptCols(page, pageSize),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [page, pageSize],
  );

  const fetchReceipts = useCallback<SubmitHandler<ReceiptSearchFormValues>>(
    (values) => {
      getReceipts({
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
        // Call fetch Receipts
        if (page === 1) {
          fetchReceipts(values);
        }
        // Reset page to 1 and called later in the useEffect 'page'
        else {
          handleChangePagination(1, pageSize);
        }
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [fetchReceipts],
  );

  const handleReset = () => {
    reset(defaultSearchValues);
    setTimeout(handleSubmit);
  };

  // Call on did mount and update page
  useEffect(() => {
    submitForm(fetchReceipts)();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  // Call on update page size
  useDidUpdate(() => {
    // Call submit form to get Receipt in case page = 1
    if (page === 1) {
      submitForm(fetchReceipts)();
    }
    // Change page to 1 and it will be revoked in the above useEffect 'page'
    else {
      handleChangePagination(1, pageSize);
    }
  }, [pageSize]);

  return (
    <AppContent title={appPaths.receipt().title}>
      <Spin loading={loading}>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <SearchForm onSubmit={handleSubmit} onReset={handleReset}>
              <ReceiptSearchForm control={control} />
            </SearchForm>
          </Grid>
          <Restriction privilege={PRIVILEGES.createReceipt.value}>
            <Grid item container spacing={2}>
              <Grid item>
                <CreateButtonManual onRefresh={handleSubmit} />
              </Grid>
              <Grid item>
                <CreateButtonGenerate onRefresh={handleSubmit} />
              </Grid>
            </Grid>
          </Restriction>
          <Grid item>
            <ReceiptFormContext.Provider
              value={{
                onView: handleView,
                onDelete: handleDelete,
                onRefresh: handleSubmit,
              }}
            >
              <TableContainer component={Paper}>
                <MyTable data={receipts} columns={ReceiptCols} />
              </TableContainer>
              <ViewReceiptDialogContext.Provider
                value={{
                  open: isOpenView,
                  receipt: selectedReceipt,
                  onClose: handleCloseView,
                }}
              >
                <ViewDialogForm />
              </ViewReceiptDialogContext.Provider>
              <DeleteReceiptDialogContext.Provider
                value={{
                  open: isOpenDelete,
                  receipt: selectedReceipt,
                  onClose: handleCloseDelete,
                }}
              >
                <DeleteDialogForm />
              </DeleteReceiptDialogContext.Provider>
            </ReceiptFormContext.Provider>
          </Grid>
          {receipts.length > 0 && (
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

export default ReceiptPage;

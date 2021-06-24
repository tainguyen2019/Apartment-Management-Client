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

import * as actionCreators from 'redux/account/actionCreators';

import { Account, SearchAccountFormValues } from 'types/account';
import { PRIVILEGES } from 'constants/users';
import Restriction from 'components/common/restriction';

import AccountDialogContext from './contexts/AccountDialogContext';
import AccountFormContext from './contexts/AccountFormContext';

import CreateButton from './components/create-button';
import EditDialogForm from './components/edit-dialog-form';
import AccountSearchForm from './components/account-search-form';

import { createAccountCols } from './utils';
import { selectAccountState } from 'selectors/account';
import { appPaths } from '../../routes/paths';

const defaultSearchValues: DefaultValues<SearchAccountFormValues> = {
  username: '',
  role_id: 'Tất cả',
  type: 'Tất cả',
};

const AccountPage: React.FC = () => {
  const [searchAccounts] = useActions(actionCreators.searchAccounts);
  const { page, pageSize, handleChangePagination } = usePagination();
  const [isOpenEditForm, toggleEditForm] = useToggle();
  const [selectedAccount, setSelectedAccount] = useState<Account>();
  const { loading, accounts, totalPages } =
    useShallowEqualSelector(selectAccountState);
  const {
    control,
    handleSubmit: submitForm,
    reset,
  } = useForm<SearchAccountFormValues>({
    defaultValues: defaultSearchValues,
  });

  const handleEdit = useCallback(
    (account: Account) => () => {
      setSelectedAccount(account);
      toggleEditForm();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const handleCloseEdit = useCallback(() => {
    setSelectedAccount(undefined);
    toggleEditForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const accountCols = useMemo(
    () => createAccountCols(page, pageSize),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [page, pageSize],
  );

  const handleSearchAccounts = useCallback<
    SubmitHandler<SearchAccountFormValues>
  >(
    (values) => {
      searchAccounts({
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
        // Call fetch Reflects
        if (page === 1) {
          handleSearchAccounts(values);
        }
        // Reset page to 1 and called later in the useEffect 'page'
        else {
          handleChangePagination(1, pageSize);
        }
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [handleSearchAccounts],
  );

  const handleReset = () => {
    reset(defaultSearchValues);
    setTimeout(handleSubmit);
  };

  // Call on did mount and update page
  useEffect(() => {
    submitForm(handleSearchAccounts)();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  // Call on update page size
  useDidUpdate(() => {
    // Call submit form to get Reflect in case page = 1
    if (page === 1) {
      submitForm(handleSearchAccounts)();
    }
    // Change page to 1 and it will be revoked in the above useEffect 'page'
    else {
      handleChangePagination(1, pageSize);
    }
  }, [pageSize]);

  return (
    <AppContent title={appPaths.accountManagement.title}>
      <Spin loading={loading}>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <SearchForm onSubmit={handleSubmit} onReset={handleReset}>
              <AccountSearchForm control={control} />
            </SearchForm>
          </Grid>
          <AccountFormContext.Provider
            value={{
              onEdit: handleEdit,
              onRefresh: handleSubmit,
            }}
          >
            <Grid item>
              <Restriction privilege={PRIVILEGES.createAccount.value}>
                <CreateButton />
              </Restriction>
            </Grid>
            <Grid item>
              <TableContainer component={Paper}>
                <MyTable data={accounts} columns={accountCols} />
              </TableContainer>
            </Grid>
            <AccountDialogContext.Provider
              value={{
                open: isOpenEditForm,
                account: selectedAccount,
                onClose: handleCloseEdit,
              }}
            >
              <EditDialogForm />
            </AccountDialogContext.Provider>
          </AccountFormContext.Provider>
          {accounts.length > 0 && (
            <Grid item>
              <MyPagination
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

export default AccountPage;

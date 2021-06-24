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

import * as actionCreators from 'redux/notification/actionCreators';
import { selectNotificationState } from 'selectors/notification';
import { Notification, NotificationSearchFormValues } from 'types/notification';
import AppContent from 'components/app/app-content';
import { appPaths } from 'routes/paths';
import { PRIVILEGES } from 'constants/users';
import Restriction from 'components/common/restriction';

import NotificationDialogContext from './NotificationDialogContext';
import EditDialogForm from './components/edit-dialog-form';
import CreateButton from './components/create-button';
import NotificationSearchForm from './components/notification-search-form';
import { createNotificationCols } from './utils';
import { useStyles } from './styles';

const defaultSearchValues: DefaultValues<NotificationSearchFormValues> = {
  from_date: '',
  to_date: '',
  title: '',
  status: 'Tất cả',
};

const ApartmentPage: React.FC = () => {
  const classes = useStyles();
  const [getNotifications] = useActions(actionCreators.getNotifications);
  const { page, pageSize, handleChangePagination } = usePagination();
  const [isOpenEditForm, toggleEditForm] = useToggle();
  const [selectedNotification, setSelectedNotification] =
    useState<Notification>();
  const { loading, notifications, totalPages } = useShallowEqualSelector(
    selectNotificationState,
  );
  const {
    control,
    handleSubmit: submitForm,
    reset,
  } = useForm<NotificationSearchFormValues>({
    defaultValues: defaultSearchValues,
  });

  const handleEdit = (notification: Notification) => () => {
    setSelectedNotification(notification);
    toggleEditForm();
  };

  const handleClose = () => {
    setSelectedNotification(undefined);
    toggleEditForm();
  };

  const notificationCols = useMemo(
    () => createNotificationCols(handleEdit, page, pageSize),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [page, pageSize],
  );

  const searchNotifications = useCallback<
    SubmitHandler<NotificationSearchFormValues>
  >(
    (values) => {
      getNotifications({
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
          searchNotifications(values);
        }
        // Reset page to 1 and called later in the useEffect 'page'
        else {
          handleChangePagination(1, pageSize);
        }
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [searchNotifications],
  );

  const handleReset = () => {
    reset(defaultSearchValues);
    setTimeout(handleSubmit);
  };

  // Call on did mount and update page
  useEffect(() => {
    submitForm(searchNotifications)();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  // Call on update page size
  useDidUpdate(() => {
    // Call submit form to get apartment in case page = 1
    if (page === 1) {
      submitForm(searchNotifications)();
    }
    // Change page to 1 and it will be revoked in the above useEffect 'page'
    else {
      handleChangePagination(1, pageSize);
    }
  }, [pageSize]);

  return (
    <AppContent title={appPaths.notification().title}>
      <Spin loading={loading}>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <SearchForm onSubmit={handleSubmit} onReset={handleReset}>
              <NotificationSearchForm control={control} />
            </SearchForm>
          </Grid>
          <Grid item>
            <Restriction privilege={PRIVILEGES.createNotification.value}>
              <CreateButton onRefresh={handleSubmit} />
            </Restriction>
          </Grid>
          <Grid item>
            <NotificationDialogContext.Provider
              value={{
                open: isOpenEditForm,
                notification: selectedNotification,
                onRefresh: handleSubmit,
              }}
            >
              <TableContainer component={Paper}>
                <MyTable data={notifications} columns={notificationCols} />
              </TableContainer>
              <EditDialogForm onClose={handleClose} onRefresh={handleSubmit} />
            </NotificationDialogContext.Provider>
          </Grid>
          {notifications.length > 0 && (
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

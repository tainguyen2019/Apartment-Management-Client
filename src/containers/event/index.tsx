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
import * as actionCreators from 'redux/event/actionCreators';
import { selectEventState } from 'selectors/event';
import { Event, EventSearchFormValues } from 'types/event';
import AppContent from 'components/app/app-content';
import { appPaths } from 'routes/paths';
import Restriction from 'components/common/restriction';
import { PRIVILEGES } from 'constants/users';

import EventFormContext from './contexts/EventFormContext';
import EventDialogContext from './contexts/EventDialogContext';
import CancelEventDialogContext from './contexts/CancelEventDialogContext';
import EditDialogForm from './components/edit-dialog-form';
import CancelDialogForm from './components/cancel-dialog-form';
import CreateButton from './components/create-button';
import EventSearchForm from './components/event-search-form';
import { createEventCols } from './utils';
import { useStyles } from './styles';

const defaultSearchValues: DefaultValues<EventSearchFormValues> = {
  apartment_number: '',
  block_number: '',
  name: '',
  staff_name: '',
  status: 'Tất cả',
};

const EventPage: React.FC = () => {
  const classes = useStyles();
  const [getEvents] = useActions(actionCreators.getEvents);
  const { page, pageSize, handleChangePagination } = usePagination();
  const [isOpenEditForm, toggleEditForm] = useToggle();
  const [isOpenCancelForm, toggleCancelForm] = useToggle();
  const [selectedEvent, setSelectedEvent] = useState<Event>();
  const { loading, events, totalPages } =
    useShallowEqualSelector(selectEventState);
  const {
    control,
    handleSubmit: submitForm,
    reset,
  } = useForm<EventSearchFormValues>({
    defaultValues: defaultSearchValues,
  });

  const handleEdit = (Event: Event) => () => {
    setSelectedEvent(Event);
    toggleEditForm();
  };

  const handleCloseEdit = () => {
    setSelectedEvent(undefined);
    toggleEditForm();
  };

  const handleCancel = (Event: Event) => () => {
    setSelectedEvent(Event);
    toggleCancelForm();
  };

  const handleCloseCancel = () => {
    setSelectedEvent(undefined);
    toggleCancelForm();
  };

  const EventCols = useMemo(
    () => createEventCols(page, pageSize),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [page, pageSize],
  );

  const fetchEvents = useCallback<SubmitHandler<EventSearchFormValues>>(
    (values) => {
      getEvents({
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
        // Call fetch Events
        if (page === 1) {
          fetchEvents(values);
        }
        // Reset page to 1 and called later in the useEffect 'page'
        else {
          handleChangePagination(1, pageSize);
        }
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [fetchEvents],
  );

  const handleReset = () => {
    reset(defaultSearchValues);
    setTimeout(handleSubmit);
  };

  // Call on did mount and update page
  useEffect(() => {
    submitForm(fetchEvents)();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  // Call on update page size
  useDidUpdate(() => {
    // Call submit form to get Event in case page = 1
    if (page === 1) {
      submitForm(fetchEvents)();
    }
    // Change page to 1 and it will be revoked in the above useEffect 'page'
    else {
      handleChangePagination(1, pageSize);
    }
  }, [pageSize]);

  return (
    <AppContent title={appPaths.event.title}>
      <Spin loading={loading}>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <SearchForm onSubmit={handleSubmit} onReset={handleReset}>
              <EventSearchForm control={control} />
            </SearchForm>
          </Grid>
          <Grid item>
            <Restriction privilege={PRIVILEGES.createEvent.value}>
              <CreateButton onRefresh={handleSubmit} />
            </Restriction>
          </Grid>
          <Grid item>
            <EventFormContext.Provider
              value={{
                onEdit: handleEdit,
                onRefresh: handleSubmit,
                onCancel: handleCancel,
              }}
            >
              <TableContainer component={Paper}>
                <MyTable data={events} columns={EventCols} />
              </TableContainer>
              <EventDialogContext.Provider
                value={{
                  open: isOpenEditForm,
                  event: selectedEvent,
                  onClose: handleCloseEdit,
                }}
              >
                <EditDialogForm />
              </EventDialogContext.Provider>
              <CancelEventDialogContext.Provider
                value={{
                  open: isOpenCancelForm,
                  event: selectedEvent,
                  onClose: handleCloseCancel,
                }}
              >
                <CancelDialogForm />
              </CancelEventDialogContext.Provider>
            </EventFormContext.Provider>
          </Grid>
          {events.length > 0 && (
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

export default EventPage;

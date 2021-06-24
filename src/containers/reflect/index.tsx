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

import * as actionCreators from 'redux/reflect/actionCreators';
import { selectReflectState } from 'selectors/reflect';

import { Reflect, ReflectSearchFormValues } from 'types/reflect';
import { appPaths } from 'routes/paths';
import Restriction from 'components/common/restriction';
import { PRIVILEGES } from 'constants/users';

import AnswerReflectDialogContext from './contexts/AnswerReflectDialogContext';
import ReflectDialogContext from './contexts/ReflectDialogContext';
import ReflectFormContext from './contexts/ReflectFormContext';
import ViewReflectDialogContext from './contexts/ViewReflectDialogContext';

import AnswerDialogForm from './components/answer-dialog-form';
import CreateButton from './components/create-button';
import EditDialogForm from './components/edit-dialog-form';
import ReflectSearchForm from './components/reflect-search-form';
import ViewDialogForm from './components/view-dialog-form';

import { createReflectCols } from './utils';
import { useStyles } from './styles';

const defaultSearchValues: DefaultValues<ReflectSearchFormValues> = {
  apartment_number: '',
  block_number: '',
  title: '',
  content: '',
  answer: '',
  department_id: 'Tất cả',
  status: 'Tất cả',
};

const ReflectPage: React.FC = () => {
  const classes = useStyles();
  const [getReflects] = useActions(actionCreators.getReflects);
  const { page, pageSize, handleChangePagination } = usePagination();
  const [isOpenEditForm, toggleEditForm] = useToggle();
  const [isOpenAnswerForm, toggleAnswerForm] = useToggle();
  const [isOpenView, toggleView] = useToggle();
  const [selectedReflect, setSelectedReflect] = useState<Reflect>();
  const { loading, reflects, totalPages } =
    useShallowEqualSelector(selectReflectState);
  const {
    control,
    handleSubmit: submitForm,
    reset,
  } = useForm<ReflectSearchFormValues>({
    defaultValues: defaultSearchValues,
  });

  const handleEdit = useCallback(
    (reflect: Reflect) => () => {
      setSelectedReflect(reflect);
      toggleEditForm();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const handleAnswer = useCallback(
    (reflect: Reflect) => () => {
      setSelectedReflect(reflect);
      toggleAnswerForm();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const handleView = useCallback(
    (reflect: Reflect) => () => {
      setSelectedReflect(reflect);
      toggleView();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const handleCloseEdit = useCallback(() => {
    setSelectedReflect(undefined);
    toggleEditForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCloseAnswer = useCallback(() => {
    setSelectedReflect(undefined);
    toggleAnswerForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCloseView = useCallback(() => {
    setSelectedReflect(undefined);
    toggleView();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const reflectCols = useMemo(
    () => createReflectCols(page, pageSize),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [page, pageSize],
  );

  const fetchReflects = useCallback<SubmitHandler<ReflectSearchFormValues>>(
    (values) => {
      getReflects({
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
          fetchReflects(values);
        }
        // Reset page to 1 and called later in the useEffect 'page'
        else {
          handleChangePagination(1, pageSize);
        }
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [fetchReflects],
  );

  const handleReset = () => {
    reset(defaultSearchValues);
    setTimeout(handleSubmit);
  };

  // Call on did mount and update page
  useEffect(() => {
    submitForm(fetchReflects)();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  // Call on update page size
  useDidUpdate(() => {
    // Call submit form to get Reflect in case page = 1
    if (page === 1) {
      submitForm(fetchReflects)();
    }
    // Change page to 1 and it will be revoked in the above useEffect 'page'
    else {
      handleChangePagination(1, pageSize);
    }
  }, [pageSize]);

  return (
    <AppContent title={appPaths.reflect.title}>
      <Spin loading={loading}>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <SearchForm onSubmit={handleSubmit} onReset={handleReset}>
              <ReflectSearchForm control={control} />
            </SearchForm>
          </Grid>
          <ReflectFormContext.Provider
            value={{
              onEdit: handleEdit,
              onRefresh: handleSubmit,
              onAnswer: handleAnswer,
              onView: handleView,
            }}
          >
            <Grid item>
              <Restriction privilege={PRIVILEGES.createReflect.value}>
                <CreateButton onRefresh={handleSubmit} />
              </Restriction>
            </Grid>
            <Grid item>
              <TableContainer component={Paper}>
                <MyTable data={reflects} columns={reflectCols} />
              </TableContainer>
            </Grid>
            <ReflectDialogContext.Provider
              value={{
                open: isOpenEditForm,
                reflect: selectedReflect,
                onClose: handleCloseEdit,
              }}
            >
              <EditDialogForm />
            </ReflectDialogContext.Provider>
            <AnswerReflectDialogContext.Provider
              value={{
                open: isOpenAnswerForm,
                reflect: selectedReflect,
                onClose: handleCloseAnswer,
              }}
            >
              <AnswerDialogForm />
            </AnswerReflectDialogContext.Provider>
            <ViewReflectDialogContext.Provider
              value={{
                open: isOpenView,
                reflect: selectedReflect,
                onClose: handleCloseView,
              }}
            >
              <ViewDialogForm />
            </ViewReflectDialogContext.Provider>
          </ReflectFormContext.Provider>
          {reflects.length > 0 && (
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

export default ReflectPage;

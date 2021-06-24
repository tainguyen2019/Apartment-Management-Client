import React, { useContext } from 'react';
import { Button } from '@material-ui/core';
import { DefaultValues } from 'react-hook-form';
import dayjs from 'dayjs';
import { FIELD_DATE_FORMAT } from 'constants/common';

import useBackendServiceCallback from 'hooks/useBackendServiceCallback';
import useDidUpdate from 'hooks/useDidUpdate';
import useToggle from 'hooks/useToggle';
import absenceService from 'services/absence';

import { AbsenceFormValues } from 'types/absence';
import AbsenceDialogForm from '../absence-dialog-form';
import AbsenceFormContext from '../../context/AbsenceFormContext';

const initialValues: DefaultValues<AbsenceFormValues> = {
  date: dayjs().format(FIELD_DATE_FORMAT),
  reason: '',
};

const CreateButton: React.FC = () => {
  const { onRefresh } = useContext(AbsenceFormContext);
  const [open, toggle] = useToggle();
  const [{ loading, success }, createAbsence] = useBackendServiceCallback(
    absenceService.create,
  );

  useDidUpdate(() => {
    if (success && onRefresh) {
      setTimeout(onRefresh, 1000);
      setTimeout(toggle, 500);
    }
  }, [success]);

  return (
    <>
      <Button variant="outlined" size="medium" color="primary" onClick={toggle}>
        Thêm mới
      </Button>
      <AbsenceDialogForm
        key={'insert-absence'}
        initialValues={initialValues}
        loading={loading}
        open={open}
        title="Thêm mới nghỉ phép"
        onClose={toggle}
        onSubmit={createAbsence}
      />
    </>
  );
};

export default CreateButton;

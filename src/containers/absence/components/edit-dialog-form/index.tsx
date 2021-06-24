import { useContext } from 'react';
import dayjs from 'dayjs';
import { DefaultValues, SubmitHandler } from 'react-hook-form';

import absenceService from 'services/absence';
import useBackendServiceCallback from 'hooks/useBackendServiceCallback';
import useDidUpdate from 'hooks/useDidUpdate';
import { FIELD_DATE_FORMAT } from 'constants/common';
import { AbsenceFormValues } from 'types/absence';

import AbsenceDialogContext from '../../context/AbsenceDialogContext';
import AbsenceFormContext from '../../context/AbsenceFormContext';
import AbsenceDialogForm from '../absence-dialog-form';

const EditDialogForm: React.FC = () => {
  const { open, absence, onClose } = useContext(AbsenceDialogContext);
  const { onRefresh } = useContext(AbsenceFormContext);
  const [{ loading, success }, updateAbsence] = useBackendServiceCallback(
    absenceService.update,
  );

  useDidUpdate(() => {
    if (success && onRefresh && onClose) {
      setTimeout(onRefresh, 1000);
      setTimeout(onClose, 500);
    }
  }, [success]);

  if (!absence) return null;

  const { id, date, reason } = absence;

  const handleSubmit: SubmitHandler<AbsenceFormValues> = (values) => {
    updateAbsence({
      ...values,
      id,
    });
  };

  const initialValues: DefaultValues<AbsenceFormValues> = {
    reason,
    date: dayjs(date).format(FIELD_DATE_FORMAT),
  };

  return (
    <AbsenceDialogForm
      key="edit-absence"
      initialValues={initialValues}
      loading={loading}
      open={open}
      title="Cập nhật thông tin nghỉ phép"
      onSubmit={handleSubmit}
      onClose={onClose}
    />
  );
};

export default EditDialogForm;

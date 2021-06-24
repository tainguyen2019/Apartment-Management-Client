import { useContext } from 'react';
import dayjs from 'dayjs';

import useBackendServiceCallback from 'hooks/useBackendServiceCallback';
import { SubmitHandler } from 'react-hook-form';
import { ShiftFormValues } from 'types/shift';
import ShiftDialogContext from '../../ShiftDialogContext';
import ShistDialogForm from '../shift-dialog-form';
import shiftService from 'services/shift';
import useDidUpdate from 'hooks/useDidUpdate';
import { FIELD_DATE_FORMAT } from 'constants/common';

interface EditDialogFormProps {
  onClose: React.MouseEventHandler;
  onRefresh: VoidFunction;
}

const EditDialogForm: React.FC<EditDialogFormProps> = ({
  onClose,
  onRefresh,
}) => {
  const { open, shift: selectedShift } = useContext(ShiftDialogContext);
  const [{ loading, success }, updateShift] = useBackendServiceCallback(
    shiftService.update,
  );

  useDidUpdate(() => {
    if (success) {
      setTimeout(onRefresh, 1000);
      setTimeout(onClose, 500);
    }
  }, [success]);

  if (!selectedShift) return null;

  const { id, area_id, date, staff_id, description, shift } = selectedShift;
  const initialValues: ShiftFormValues = {
    area_id,
    staff_id,
    description,
    shift,
    date: dayjs(date).format(FIELD_DATE_FORMAT),
  };

  const onSubmit: SubmitHandler<ShiftFormValues> = (values) => {
    updateShift({
      ...values,
      id: id!,
    });
  };

  return (
    <ShistDialogForm
      key="edit-shift"
      initialValues={initialValues}
      loading={loading}
      open={open}
      title="Cập nhật thông tin ca trực"
      onSubmit={onSubmit}
      onClose={onClose}
    />
  );
};

export default EditDialogForm;

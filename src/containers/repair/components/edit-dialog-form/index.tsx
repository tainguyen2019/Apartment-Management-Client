import { useContext } from 'react';
import { SubmitHandler } from 'react-hook-form';
import dayjs from 'dayjs';

import useBackendServiceCallback from 'hooks/useBackendServiceCallback';
import { RepairFormValues } from 'types/repair';
import repairService from 'services/repair';
import useDidUpdate from 'hooks/useDidUpdate';
import { FIELD_DATE_FORMAT } from 'constants/common';

import EditRepairDialogContext from '../../contexts/EditRepairDialogContext';
import RepairFormContext from '../../contexts/RepairFormContext';
import RepairDialogForm from '../repair-dialog-form';

const EditDialogForm: React.FC = () => {
  const { onRefresh } = useContext(RepairFormContext);
  const { open, repair, onClose } = useContext(EditRepairDialogContext);
  const [{ loading, success }, updateRepair] = useBackendServiceCallback(
    repairService.update,
  );

  useDidUpdate(() => {
    if (success && onRefresh && onClose) {
      setTimeout(onRefresh, 1000);
      setTimeout(onClose, 500);
    }
  }, [success]);

  if (!repair) return null;

  const { id, date, content } = repair;
  const initialValues: RepairFormValues = {
    date: dayjs(date).format(FIELD_DATE_FORMAT),
    content,
  };

  const onSubmit: SubmitHandler<RepairFormValues> = (values) => {
    updateRepair({
      ...values,
      id: id!,
    });
  };

  return (
    <RepairDialogForm
      key="edit-repair"
      initialValues={initialValues}
      loading={loading}
      open={open}
      title="Cập nhật thông tin gửi xe"
      onSubmit={onSubmit}
      onClose={onClose}
    />
  );
};

export default EditDialogForm;

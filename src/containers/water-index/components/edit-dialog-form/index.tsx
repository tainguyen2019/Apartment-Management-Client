import { useContext } from 'react';
import { DefaultValues, SubmitHandler } from 'react-hook-form';
import dayjs from 'dayjs';
import { FIELD_DATE_FORMAT } from 'constants/common';

import { WaterIndexFormValues } from 'types/water-index';
import waterIndexService from 'services/water-index';
import useBackendServiceCallback from 'hooks/useBackendServiceCallback';
import useDidUpdate from 'hooks/useDidUpdate';

import WaterIndexDialogContext from '../../contexts/WaterIndexDialogContext';
import WaterIndexFormContext from '../../contexts/WaterIndexFormContext';
import WaterIndexDialogForm from '../water-index-dialog-form';

const EditDialogForm: React.FC = () => {
  const { onRefresh } = useContext(WaterIndexFormContext);
  const { open, waterIndex, onClose } = useContext(WaterIndexDialogContext);
  const [{ loading, success }, updateApartment] = useBackendServiceCallback(
    waterIndexService.update,
  );

  useDidUpdate(() => {
    if (success) {
      setTimeout(onRefresh!, 1000);
      setTimeout(onClose!, 500);
    }
  }, [success]);

  if (!waterIndex) return null;

  const handleSubmit: SubmitHandler<WaterIndexFormValues> = ({
    start_index,
    end_index,
    ...values
  }) => {
    updateApartment({
      ...values,
      id: waterIndex.id,
      apartment_id: waterIndex.apartment_id,
      end_index: Number(end_index),
      start_index: String(start_index) === '' ? null : Number(start_index),
    });
  };

  const { apartment_number, start_index, end_index, date } = waterIndex;
  const initialValues: DefaultValues<WaterIndexFormValues> = {
    apartment_number,
    start_index,
    end_index,
    date: dayjs(date).format(FIELD_DATE_FORMAT),
  };

  return (
    <WaterIndexDialogForm
      key="edit-waterIndex"
      mode="update"
      initialValues={initialValues}
      loading={loading}
      open={open}
      title="Cập nhật thông tin chỉ số nước"
      onSubmit={handleSubmit}
      onClose={onClose}
    />
  );
};

export default EditDialogForm;

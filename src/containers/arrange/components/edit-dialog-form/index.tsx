import React, { useContext } from 'react';
import { SubmitHandler } from 'react-hook-form';

import arrangeService from 'services/arrange';
import useBackendServiceCallback from 'hooks/useBackendServiceCallback';
import useDidUpdate from 'hooks/useDidUpdate';
import { ArrangeFormValues } from 'types/arrange';

import ArrangeForm from '../arrange-dialog-form';
import ArrangeDialogContext from '../../contexts/ArrangeDialogContext';
import ArrangeFormContext from '../../contexts/ArrangeFormContext';

const EditForm: React.FC = () => {
  const { open, arrange, onClose } = useContext(ArrangeDialogContext);
  const { onRefresh } = useContext(ArrangeFormContext);
  const [{ loading, success }, updateArrange] = useBackendServiceCallback(
    arrangeService.update,
  );

  useDidUpdate(() => {
    if (success && onRefresh && onClose) {
      setTimeout(onRefresh, 1000);
      setTimeout(onClose, 500);
    }
  }, [success]);

  if (!arrange) return null;

  const { id, device_id, area_id, quantity } = arrange;
  const initialValues: ArrangeFormValues = {
    device_id,
    area_id,
    quantity,
  };

  const onSubmit: SubmitHandler<ArrangeFormValues> = (values) => {
    updateArrange({
      ...values,
      id: id!,
    });
  };

  return (
    <ArrangeForm
      key={'edit-arrange'}
      title="Cập nhật thông tin bố trí"
      initialValues={initialValues}
      open={open}
      loading={loading}
      onClose={onClose}
      onSubmit={onSubmit}
    />
  );
};

export default EditForm;

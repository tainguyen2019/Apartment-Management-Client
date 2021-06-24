import React, { useContext } from 'react';
import { SubmitHandler } from 'react-hook-form';

import reflectService from 'services/reflect';
import useBackendServiceCallback from 'hooks/useBackendServiceCallback';
import useDidUpdate from 'hooks/useDidUpdate';
import { ReflectFormValues } from 'types/reflect';

import ReflectForm from '../reflect-dialog-form';
import ReflectDialogContext from '../../contexts/ReflectDialogContext';
import ReflectFormContext from '../../contexts/ReflectFormContext';

const EditForm: React.FC = () => {
  const { open, reflect, onClose } = useContext(ReflectDialogContext);
  const { onRefresh } = useContext(ReflectFormContext);
  const [{ loading, success }, updateReflect] = useBackendServiceCallback(
    reflectService.update,
  );

  useDidUpdate(() => {
    if (success) {
      setTimeout(onClose!, 500);
      setTimeout(onRefresh!, 1000);
    }
  }, [success]);

  if (!reflect) return null;

  const { id, department_id, content, title } = reflect;
  const initialValues: ReflectFormValues = {
    department_id,
    title,
    content,
  };

  const handleSubmit: SubmitHandler<ReflectFormValues> = (values) => {
    updateReflect({
      ...values,
      id: id!,
    });
  };

  return (
    <ReflectForm
      key={'edit-reflect'}
      title="Cập nhật thông tin phản ánh"
      initialValues={initialValues}
      open={open}
      loading={loading}
      onClose={onClose}
      onSubmit={handleSubmit}
    />
  );
};

export default EditForm;

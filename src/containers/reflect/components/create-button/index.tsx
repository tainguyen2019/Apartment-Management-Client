import React from 'react';
import Button from '@material-ui/core/Button';

import useBackendServiceCallback from 'hooks/useBackendServiceCallback';
import useDidUpdate from 'hooks/useDidUpdate';
import useToggle from 'hooks/useToggle';
import reflectService from 'services/reflect';
import { ReflectFormValues } from 'types/reflect';
import { SubmitHandler } from 'react-hook-form';
import storageService from 'services/storage';

import ReflectForm from '../reflect-dialog-form';

const initialValues: ReflectFormValues = {
  department_id: '',
  title: '',
  content: '',
};

interface CreateButtonProps {
  onRefresh: VoidFunction;
}

const CreateButton: React.FC<CreateButtonProps> = ({ onRefresh }) => {
  const [open, toggle] = useToggle();
  const [{ loading, success }, createReflect] = useBackendServiceCallback(
    reflectService.create,
  );

  const handleCreateReflect: SubmitHandler<ReflectFormValues> = (values) => {
    const apartment_id = storageService.getItem<string>('apartment_id') || '';

    createReflect({ ...values, apartment_id });
  };

  useDidUpdate(() => {
    if (success) {
      setTimeout(onRefresh, 1000);
      setTimeout(toggle, 500);
    }
  }, [success]);

  return (
    <>
      <Button variant="outlined" color="primary" onClick={toggle}>
        Thêm mới
      </Button>
      <ReflectForm
        key={'insert-reflect'}
        title="Thêm mới thông tin phản ánh"
        open={open}
        loading={loading}
        initialValues={initialValues}
        onClose={toggle}
        onSubmit={handleCreateReflect}
      />
    </>
  );
};

export default CreateButton;

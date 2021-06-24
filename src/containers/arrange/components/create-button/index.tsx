import React from 'react';
import Button from '@material-ui/core/Button';

import useBackendServiceCallback from 'hooks/useBackendServiceCallback';
import useDidUpdate from 'hooks/useDidUpdate';
import useToggle from 'hooks/useToggle';
import arrangeService from 'services/arrange';
import { ArrangeFormValues } from 'types/arrange';
import { SubmitHandler } from 'react-hook-form';

import ArrangeForm from '../arrange-dialog-form';

const initialValues: ArrangeFormValues = {
  area_id: '',
  device_id: '',
  quantity: 0,
};

interface CreateButtonProps {
  onRefresh: VoidFunction;
}

const CreateButton: React.FC<CreateButtonProps> = ({ onRefresh }) => {
  const [open, toggle] = useToggle();
  const [{ loading, success }, createArrange] = useBackendServiceCallback(
    arrangeService.create,
  );

  const handleCreateArrange: SubmitHandler<ArrangeFormValues> = (values) => {
    createArrange(values);
  };

  useDidUpdate(() => {
    if (success) {
      setTimeout(toggle, 500);
      setTimeout(onRefresh, 1000);
    }
  }, [success]);

  return (
    <>
      <Button variant="outlined" color="primary" onClick={toggle}>
        Thêm mới
      </Button>
      <ArrangeForm
        key={'insert-arrange'}
        title="Thêm mới bố trí"
        open={open}
        loading={loading}
        initialValues={initialValues}
        onClose={toggle}
        onSubmit={handleCreateArrange}
      />
    </>
  );
};

export default CreateButton;

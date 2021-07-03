import React from 'react';
import Button from '@material-ui/core/Button';

import AreaForm from 'containers/area/components/area-form';
import useBackendServiceCallback from 'hooks/useBackendServiceCallback';
import useDidUpdate from 'hooks/useDidUpdate';
import useToggle from 'hooks/useToggle';
import areaService from 'services/area';
import { AreaFormValues } from 'types/area';
import { SubmitHandler } from 'react-hook-form';
import Spin from 'ui/spin';

const initialValues: AreaFormValues = {
  building: '',
  location: '',
};

interface InsertButtonProps {
  onRefresh: VoidFunction;
}

const InsertButton: React.FC<InsertButtonProps> = ({ onRefresh }) => {
  const [open, toggle] = useToggle();
  const [{ loading, success }, createArea] = useBackendServiceCallback(
    areaService.create,
  );

  const handleCreateArea: SubmitHandler<AreaFormValues> = (values) => {
    createArea(values);
  };

  useDidUpdate(() => {
    if (success) {
      setTimeout(onRefresh, 1000);
      setTimeout(toggle, 500);
    }
  }, [success]);

  return (
    <Spin loading={loading}>
      <Button variant="outlined" color="primary" onClick={toggle}>
        Thêm mới
      </Button>
      <AreaForm
        key={'insert-area'}
        title="Thêm mới vị trí/ khu vực"
        open={open}
        loading={loading}
        initialValues={initialValues}
        onClose={toggle}
        onSubmit={handleCreateArea}
      />
    </Spin>
  );
};

export default InsertButton;

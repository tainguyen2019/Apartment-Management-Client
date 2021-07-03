import React, { useContext } from 'react';
import { SubmitHandler } from 'react-hook-form';

import AreaForm from 'containers/area/components/area-form';
import areaService from 'services/area';
import useBackendServiceCallback from 'hooks/useBackendServiceCallback';
import useDidUpdate from 'hooks/useDidUpdate';
import { AreaFormValues } from 'types/area';

import AreaDialogContext from './AreaDialogContext';

interface EditFormProps {
  onClose: React.MouseEventHandler;
  onRefresh: VoidFunction;
}

const EditForm: React.FC<EditFormProps> = ({ onClose, onRefresh }) => {
  const { open, area } = useContext(AreaDialogContext);
  const [{ success, loading }, updateArea] = useBackendServiceCallback(
    areaService.update,
  );

  useDidUpdate(() => {
    if (success) {
      setTimeout(onRefresh, 1000);
      setTimeout(onClose, 500);
    }
  }, [success]);

  if (!area) return null;

  const { id, building, location } = area;
  const initialValues: AreaFormValues = {
    building,
    location,
  };

  const onSubmit: SubmitHandler<AreaFormValues> = (values) => {
    updateArea({
      ...values,
      id: id!,
    });
  };

  return (
    <AreaForm
      key={'edit-area'}
      title="Cập nhật thông tin khu vực"
      initialValues={initialValues}
      open={open}
      loading={loading}
      onClose={onClose}
      onSubmit={onSubmit}
    />
  );
};

export default EditForm;

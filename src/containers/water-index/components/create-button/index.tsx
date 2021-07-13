import React from 'react';
import { Button } from '@material-ui/core';
import { DefaultValues, SubmitHandler } from 'react-hook-form';
import dayjs from 'dayjs';

import { FIELD_DATE_FORMAT } from 'constants/common';
import useBackendServiceCallback from 'hooks/useBackendServiceCallback';
import useDidUpdate from 'hooks/useDidUpdate';
import useToggle from 'hooks/useToggle';
import waterIndexService from 'services/water-index';
import { WaterIndexFormValues } from 'types/water-index';
import WaterIndexDialogForm from '../water-index-dialog-form';

const initialValues: DefaultValues<WaterIndexFormValues> = {
  apartment_id: '',
  date: dayjs().format(FIELD_DATE_FORMAT),
  end_index: 0,
};

interface InsertButtonProps {
  onRefresh: VoidFunction;
}

const CreateButton: React.FC<InsertButtonProps> = ({ onRefresh }) => {
  const [open, toggle] = useToggle();
  const [{ loading, success }, createWaterIndex] = useBackendServiceCallback(
    waterIndexService.create,
  );

  const handleSubmit: SubmitHandler<WaterIndexFormValues> = ({
    start_index,
    end_index,
    ...values
  }) => {
    createWaterIndex({
      ...values,
      start_index: String(start_index) !== '' ? Number(start_index) : null,
      end_index: Number(end_index),
    });
  };

  useDidUpdate(() => {
    if (success) {
      setTimeout(onRefresh, 1000);
      setTimeout(toggle, 500);
    }
  }, [success]);

  return (
    <>
      <Button variant="outlined" size="medium" color="primary" onClick={toggle}>
        Thêm mới
      </Button>
      <WaterIndexDialogForm
        key={'insert-apartment'}
        mode="create"
        initialValues={initialValues}
        loading={loading}
        open={open}
        title="Thêm mới chỉ số nước"
        onClose={toggle}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default CreateButton;

import React from 'react';
import { Button } from '@material-ui/core';
import { DefaultValues } from 'react-hook-form';

import useBackendServiceCallback from 'hooks/useBackendServiceCallback';
import useDidUpdate from 'hooks/useDidUpdate';
import useToggle from 'hooks/useToggle';
import apartmentService from 'services/apartment';
import { ApartmentFormValues } from 'types/apartment';
import ApartmentDialogForm from '../apartment-dialog-form';

const initialValues: DefaultValues<ApartmentFormValues> = {
  apartment_number: '',
  block_number: '',
  floor_area: 0,
  type: 'Nhà ở thường',
};

interface InsertButtonProps {
  onRefresh: VoidFunction;
}

const CreateButton: React.FC<InsertButtonProps> = ({ onRefresh }) => {
  const [open, toggle] = useToggle();
  const [{ loading, success }, createApartment] = useBackendServiceCallback(
    apartmentService.create,
  );

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
      <ApartmentDialogForm
        key={'insert-apartment'}
        initialValues={initialValues}
        loading={loading}
        open={open}
        title="Thêm mới căn hộ"
        onClose={toggle}
        onSubmit={createApartment}
      />
    </>
  );
};

export default CreateButton;

import useBackendServiceCallback from 'hooks/useBackendServiceCallback';
import { useContext } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { ApartmentFormValues } from 'types/apartment';
import ApartmentDialogContext from '../../ApartmentDialogContext';
import ApartmentDialogForm from '../apartment-dialog-form';
import apartmentService from 'services/apartment';
import useDidUpdate from 'hooks/useDidUpdate';

interface EditDialogFormProps {
  onClose: React.MouseEventHandler;
  onRefresh: VoidFunction;
}

const EditDialogForm: React.FC<EditDialogFormProps> = ({
  onClose,
  onRefresh,
}) => {
  const { open, apartment } = useContext(ApartmentDialogContext);
  const [{ loading, success }, updateApartment] = useBackendServiceCallback(
    apartmentService.update,
  );

  useDidUpdate(() => {
    if (success) {
      setTimeout(onRefresh, 1000);
      setTimeout(onClose, 500);
    }
  }, [success]);

  if (!apartment) return null;

  const handleSubmit: SubmitHandler<ApartmentFormValues> = (values) => {
    updateApartment({
      ...values,
      id: apartment!.id!,
    });
  };

  return (
    <ApartmentDialogForm
      key="edit-apartment"
      initialValues={apartment}
      loading={loading}
      open={open}
      title="Cập nhật thông tin căn hộ"
      onSubmit={handleSubmit}
      onClose={onClose}
    />
  );
};

export default EditDialogForm;

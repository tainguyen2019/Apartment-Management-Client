import useBackendServiceCallback from 'hooks/useBackendServiceCallback';
import { useContext } from 'react';
import { DefaultValues, SubmitHandler } from 'react-hook-form';
import { StaffFormValues } from 'types/staff';
import StaffDialogContext from '../../StaffDialogContext';
import StaffDialogForm from '../staff-dialog-form';
import staffService from 'services/staff';
import useDidUpdate from 'hooks/useDidUpdate';

interface EditDialogFormProps {
  onClose: React.MouseEventHandler;
  onRefresh: VoidFunction;
}

const EditDialogForm: React.FC<EditDialogFormProps> = ({
  onClose,
  onRefresh,
}) => {
  const { open, staff } = useContext(StaffDialogContext);
  const [{ loading, success }, updateStaff] = useBackendServiceCallback(
    staffService.update,
  );

  useDidUpdate(() => {
    if (success) {
      setTimeout(onRefresh, 1000);
      setTimeout(onClose, 500);
    }
  }, [success]);

  if (!staff) return null;

  const {
    id,
    email,
    name,
    position_id,
    phone,
    salary,
    account_id,
    account_name,
    status,
  } = staff;
  const initialValues: DefaultValues<StaffFormValues> = {
    email,
    name,
    position_id,
    phone,
    salary,
    account_id,
    account_name,
    status,
  };

  // Excludes account_name
  const onSubmit: SubmitHandler<StaffFormValues> = ({
    account_name: _accountName,
    ...values
  }) => {
    updateStaff({
      ...values,
      id: id!,
    });
  };

  return (
    <StaffDialogForm
      key="edit-staff"
      initialValues={initialValues}
      loading={loading}
      open={open}
      title="Cập nhật thông tin nhân viên"
      onSubmit={onSubmit}
      onClose={onClose}
    />
  );
};

export default EditDialogForm;

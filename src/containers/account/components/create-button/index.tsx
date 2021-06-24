import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';

import useBackendServiceCallback from 'hooks/useBackendServiceCallback';
import useDidUpdate from 'hooks/useDidUpdate';
import useToggle from 'hooks/useToggle';
import accountService from 'services/account';
import { CreateAccountFormValues } from 'types/account';
import { DefaultValues, SubmitHandler } from 'react-hook-form';

import CreateDialogForm from '../create-dialog-form';
import AccountFormContext from '../../contexts/AccountFormContext';

const initialValues: DefaultValues<CreateAccountFormValues> = {
  username: '',
  password: '',
  rePassword: '',
  role_id: '',
  type: 'internal',
};

const CreateButton: React.FC = () => {
  const { onRefresh } = useContext(AccountFormContext);
  const [open, toggle] = useToggle();
  const [{ loading, success }, createAccount] = useBackendServiceCallback(
    accountService.create,
  );

  const handleCreateAccount: SubmitHandler<CreateAccountFormValues> = (
    values,
  ) => {
    createAccount(values);
  };

  useDidUpdate(() => {
    if (success) {
      setTimeout(onRefresh!, 1000);
      setTimeout(toggle, 500);
    }
  }, [success]);

  return (
    <>
      <Button variant="outlined" color="primary" onClick={toggle}>
        Thêm mới
      </Button>
      <CreateDialogForm
        open={open}
        loading={loading}
        initialValues={initialValues}
        onSubmit={handleCreateAccount}
        onClose={toggle}
      />
    </>
  );
};

export default CreateButton;

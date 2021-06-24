import React, { useContext } from 'react';
import {
  Grid,
  DialogContent,
  Button,
  DialogActions,
  TextField,
} from '@material-ui/core';
import { DefaultValues, SubmitHandler, useForm } from 'react-hook-form';

import accountService from 'services/account';
import useBackendServiceCallback from 'hooks/useBackendServiceCallback';
import useDidUpdate from 'hooks/useDidUpdate';
import { Account, EditAccountFormValues } from 'types/account';

import MyDialog from 'components/common/my-dialog';
import MySelect from 'components/common/my-select';
import RoleSelect from 'components/common/role-select';

import AccountFormContext from '../../contexts/AccountFormContext';

interface DialogFormProps {
  account: Account;
  open: boolean;
  onClose?: VoidFunction;
}

const ACCOUNT_TYPES = {
  internal: 'internal',
  external: 'external',
};

const ACCOUNT_TYPE_OPTIONS = Object.entries(ACCOUNT_TYPES).map(
  ([value, label]) => ({
    value,
    label,
  }),
);

const DialogForm: React.FC<DialogFormProps> = ({ open, account, onClose }) => {
  const { onRefresh } = useContext(AccountFormContext);
  const [{ loading, success }, updateAccount] = useBackendServiceCallback(
    accountService.update,
  );

  const initialValues: DefaultValues<EditAccountFormValues> = {
    role_id: account.role_id,
    type: account.type,
  };

  const {
    control,
    reset,
    handleSubmit: submitForm,
  } = useForm({
    defaultValues: initialValues,
  });

  const handleSubmit: SubmitHandler<EditAccountFormValues> = (values) => {
    updateAccount({
      ...values,
      id: account!.id,
    });
  };

  useDidUpdate(() => {
    if (!open) {
      reset(initialValues);
    }
  }, [open]);

  useDidUpdate(() => {
    if (success) {
      setTimeout(onClose!, 500);
      setTimeout(onRefresh!, 1000);
    }
  }, [success]);

  return (
    <MyDialog
      fullWidth
      loading={loading}
      open={open}
      title="Cập nhật thông tin tài khoản"
      onClose={onClose}
    >
      <form onSubmit={submitForm(handleSubmit)}>
        <DialogContent>
          <Grid container direction="column" spacing={3}>
            <Grid item>
              <TextField
                fullWidth
                disabled
                label="Tên tài khoản"
                variant="outlined"
                InputProps={{
                  readOnly: true,
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                defaultValue={account.username}
              />
            </Grid>
            <Grid item>
              <RoleSelect
                fullWidth
                name="role_id"
                label="Role"
                control={control}
                variant="outlined"
                rules={{
                  required: 'Vui lòng nhập role',
                }}
              />
            </Grid>
            <Grid item>
              <MySelect
                fullWidth
                name="type"
                label="Loại"
                control={control}
                variant="outlined"
                options={ACCOUNT_TYPE_OPTIONS}
                rules={{
                  required: 'Vui lòng nhập loại',
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Grid container justify="flex-end" spacing={2}>
            <Grid item>
              <Button type="submit" color="primary" variant="outlined">
                Đồng ý
              </Button>
            </Grid>
            <Grid item>
              <Button onClick={onClose} color="secondary" variant="outlined">
                Hủy bỏ
              </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </form>
    </MyDialog>
  );
};

export default DialogForm;

import { useContext } from 'react';
import { Grid, Button, DialogActions, DialogContent } from '@material-ui/core';
import { useForm, DefaultValues, SubmitHandler } from 'react-hook-form';
import { ChangePasswordFormValues } from 'types/auth';

import MyDialog from '../../common/my-dialog';
import PasswordInput from '../../common/password-input';
import ChangePasswordDialogContext from './ChangePasswordDialogContext';
import authService from 'services/auth';
import storageService from 'services/storage';
import useBackendServiceCallback from 'hooks/useBackendServiceCallback';
import useDidUpdate from 'hooks/useDidUpdate';

const initialValues: DefaultValues<ChangePasswordFormValues> = {
  oldPassword: '',
  newPassword: '',
  rePassword: '',
};

const ChangePasswordDialog: React.FC = () => {
  const { open = false, onClose } = useContext(ChangePasswordDialogContext);
  const {
    handleSubmit: submitForm,
    control,
    reset,
    watch,
  } = useForm({
    defaultValues: initialValues,
  });
  const [{ loading, success }, changePassword] = useBackendServiceCallback(
    authService.changePassword,
  );

  const handleSubmit: SubmitHandler<ChangePasswordFormValues> = (values) => {
    const account_id = storageService.getItem<string>('account_id') ?? '';
    changePassword({
      ...values,
      id: account_id,
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
      setTimeout(authService.logout, 1000);
    }
  }, [success]);

  return (
    <MyDialog
      fullWidth
      title="Thay đổi mật khẩu"
      open={open}
      loading={loading}
      onClose={onClose}
    >
      <form onSubmit={submitForm(handleSubmit)}>
        <DialogContent>
          <Grid container direction="column" spacing={3}>
            <Grid item>
              <PasswordInput
                fullWidth
                autoFocus
                name="oldPassword"
                label="Mật khẩu hiện tại"
                variant="outlined"
                inputProps={{
                  autoComplete: 'new-password',
                  'aria-autocomplete': 'none',
                }}
                control={control}
                rules={{
                  required: 'Vui lòng nhập mật khẩu hiện tại',
                }}
              />
            </Grid>
            <Grid item>
              <PasswordInput
                fullWidth
                name="newPassword"
                label="Mật khẩu mới"
                variant="outlined"
                inputProps={{
                  autoComplete: 'new-password',
                  'aria-autocomplete': 'none',
                }}
                control={control}
                rules={{
                  required: 'Vui lòng nhập mật khẩu mới',
                }}
              />
            </Grid>
            <Grid item>
              <PasswordInput
                fullWidth
                name="rePassword"
                label="Nhập lại mật khẩu mới"
                variant="outlined"
                inputProps={{
                  autoComplete: 'new-password',
                  'aria-autocomplete': 'none',
                }}
                control={control}
                rules={{
                  required: 'Vui lòng nhập lại mật khẩu mới',
                  validate: (value) => {
                    const newPassword = watch('newPassword');
                    if (value !== newPassword)
                      return 'Mật khẩu mới vừa nhập không khớp.';
                  },
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

export default ChangePasswordDialog;

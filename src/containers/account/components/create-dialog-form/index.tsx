import React from 'react';
import { Button, DialogActions, DialogContent, Grid } from '@material-ui/core';
import { useForm, SubmitHandler, DefaultValues } from 'react-hook-form';

import MyDialog from 'components/common/my-dialog';
import MyInput from 'components/common/my-input';
import PasswordInput from 'components/common/password-input';
import MySelect from 'components/common/my-select';
import RoleSelect from 'components/common/role-select';
import useDidUpdate from 'hooks/useDidUpdate';
import { CreateAccountFormValues } from 'types/account';

interface CreateDialogFormProps {
  initialValues: DefaultValues<CreateAccountFormValues>;
  open: boolean;
  loading: boolean;
  onSubmit: SubmitHandler<CreateAccountFormValues>;
  onClose?: React.MouseEventHandler;
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

const CreateDialogForm: React.FC<CreateDialogFormProps> = ({
  initialValues,
  loading,
  open,
  onSubmit,
  onClose,
}) => {
  const { handleSubmit, control, reset, watch } = useForm({
    defaultValues: initialValues,
  });

  useDidUpdate(() => {
    if (!open) {
      reset(initialValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <MyDialog
      fullWidth
      loading={loading}
      open={open}
      title="Tạo tài khoản"
      onClose={onClose}
    >
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <MyInput
                fullWidth
                autoFocus
                name="username"
                label="Tên tài khoản"
                variant="outlined"
                inputProps={{
                  autoComplete: 'new-password',
                  'aria-autocomplete': 'none',
                }}
                helperText="Tên tài khoản phải chứa tối thiếu 4 ký tự, bắt đầu bằng chữ cái và chỉ bao gồm chữ cái, số, dấu chấm, và dấu xếp gạch."
                control={control}
                rules={{
                  required: 'Vui lòng nhập tên tài khoản',
                  pattern: {
                    value: /^[a-zA-Z][a-zA-Z0-9._]{2,}[a-zA-Z0-9]$/,
                    message: 'Tên tài khoản sai định dạng',
                  },
                }}
              />
            </Grid>
            <Grid item xs={6}>
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
            <Grid item xs={6}>
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
            <Grid item xs={6}>
              <PasswordInput
                fullWidth
                name="password"
                label="Mật khẩu"
                variant="outlined"
                inputProps={{
                  autoComplete: 'new-password',
                  'aria-autocomplete': 'none',
                }}
                control={control}
                rules={{
                  required: 'Vui lòng nhập mật khẩu',
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <PasswordInput
                fullWidth
                name="rePassword"
                label="Nhập lại mật khẩu"
                inputProps={{
                  autoComplete: 'new-password',
                  'aria-autocomplete': 'none',
                }}
                variant="outlined"
                control={control}
                rules={{
                  required: 'Vui lòng nhập lại mật khẩu',
                  validate: (value) => {
                    const password = watch('password');
                    if (value !== password)
                      return 'Mật khẩu vừa nhập không khớp.';
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

export default CreateDialogForm;

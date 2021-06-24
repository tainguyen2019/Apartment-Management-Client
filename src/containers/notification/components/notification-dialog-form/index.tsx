import React, { useEffect } from 'react';
import { Button, DialogActions, DialogContent, Grid } from '@material-ui/core';
import { useForm, SubmitHandler, DefaultValues } from 'react-hook-form';

import MyDialog from 'components/common/my-dialog';
import MyInput from 'components/common/my-input';
import { NotificationFormValues } from 'types/notification';

interface NotificationDialogFormProps {
  mode: 'create' | 'update';
  title: string;
  initialValues: DefaultValues<NotificationFormValues>;
  open: boolean;
  loading: boolean;
  onSubmit: SubmitHandler<NotificationFormValues>;
  onClose: React.MouseEventHandler;
}

const NotificationDialogForm: React.FC<NotificationDialogFormProps> = ({
  initialValues,
  loading,
  open,
  title,
  mode,
  onSubmit,
  onClose,
}) => {
  const { handleSubmit, control, reset, register } = useForm({
    defaultValues: initialValues,
  });

  useEffect(() => {
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
      title={title}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <MyInput
                fullWidth
                name="title"
                label="Tiêu đề"
                control={control}
                margin="normal"
                rules={{
                  required: 'Vui lòng nhập tiêu đề cho thông báo',
                }}
                variant="outlined"
              />
            </Grid>
            <Grid item>
              <MyInput
                fullWidth
                multiline
                rows={5}
                name="content"
                label="Nội dung tóm tắt"
                control={control}
                margin="normal"
                rules={{
                  required: 'Vui lòng nhập nội dung tóm tắt cho thông báo',
                }}
                variant="outlined"
              />
            </Grid>
            {mode === 'create' && (
              <Grid item>
                <input
                  type="file"
                  required
                  {...register('file', {
                    required: 'Vui lòng đính kèm file',
                  })}
                />
              </Grid>
            )}
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

export default NotificationDialogForm;

import React, { useEffect } from 'react';
import { Button, DialogActions, DialogContent, Grid } from '@material-ui/core';
import { useForm, SubmitHandler } from 'react-hook-form';
import dayjs from 'dayjs';

import MyDialog from 'components/common/my-dialog';
import MyInput from 'components/common/my-input';
import { RepairFormValues } from 'types/repair';

interface RepairDialogFormProps {
  title: string;
  initialValues: RepairFormValues;
  open: boolean;
  loading: boolean;
  onSubmit: SubmitHandler<RepairFormValues>;
  onClose?: React.MouseEventHandler;
}

const RepairDialogForm: React.FC<RepairDialogFormProps> = ({
  initialValues,
  loading,
  open,
  title,
  onSubmit,
  onClose,
}) => {
  const { handleSubmit, control, reset } = useForm({
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
          <MyInput
            fullWidth
            autoFocus
            type="date"
            name="date"
            label="Ngày dự kiến"
            InputLabelProps={{
              shrink: true,
            }}
            control={control}
            margin="normal"
            rules={{
              required: 'Vui lòng chọn ngày dự kiến',
              validate: (value) => {
                if (dayjs(value).isBefore(dayjs(), 'day')) {
                  return 'Vui lòng chọn ngày từ kiến từ hôm nay';
                }
              },
            }}
            variant="outlined"
          />
          <MyInput
            fullWidth
            multiline
            rows={2}
            name="content"
            label="Nội dung sửa chữa"
            control={control}
            margin="normal"
            rules={{
              required: 'Vui lòng nhập nội dung sửa chữa',
            }}
            variant="outlined"
          />
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

export default RepairDialogForm;

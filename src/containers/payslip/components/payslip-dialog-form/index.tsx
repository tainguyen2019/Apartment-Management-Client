import React, { useEffect } from 'react';
import { Button, DialogActions, DialogContent, Grid } from '@material-ui/core';
import { useForm, SubmitHandler } from 'react-hook-form';

import MyDialog from 'components/common/my-dialog';
import MyInput from 'components/common/my-input';
import { PayslipFormValues } from 'types/payslip';
import NumberInput from 'components/common/number-input';

interface EventDialogFormProps {
  title: string;
  initialValues: PayslipFormValues;
  open: boolean;
  loading: boolean;
  onSubmit: SubmitHandler<PayslipFormValues>;
  onClose: React.MouseEventHandler;
}

const EventDialogForm: React.FC<EventDialogFormProps> = ({
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
            autoFocus
            fullWidth
            multiline
            rows={3}
            name="content"
            label="Nội dung chi"
            control={control}
            margin="normal"
            rules={{
              required: 'Vui lòng nhập nội dung chi tiền',
            }}
            variant="outlined"
          />
          <NumberInput
            fullWidth
            name="total"
            label="Số tiền"
            control={control}
            margin="normal"
            rules={{
              required: 'Vui lòng nhập số tiền',
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

export default EventDialogForm;

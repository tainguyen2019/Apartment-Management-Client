import React, { useEffect } from 'react';
import { Button, DialogActions, DialogContent, Grid } from '@material-ui/core';
import { useForm, SubmitHandler, DefaultValues } from 'react-hook-form';
import dayjs from 'dayjs';

import MyDialog from 'components/common/my-dialog';
import MyInput from 'components/common/my-input';
import { AbsenceFormValues } from 'types/absence';

interface AbsenceDialogFormProps {
  title: string;
  initialValues: DefaultValues<AbsenceFormValues>;
  open: boolean;
  loading: boolean;
  onSubmit: SubmitHandler<AbsenceFormValues>;
  onClose?: React.MouseEventHandler;
}

const AbsenceDialogForm: React.FC<AbsenceDialogFormProps> = ({
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
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <MyInput
                fullWidth
                autoFocus
                type="date"
                name="date"
                label="Ngày nghỉ"
                control={control}
                margin="normal"
                rules={{
                  required: 'Vui lòng chọn ngày nghỉ',
                  validate: (value) => {
                    if (dayjs(value).isBefore(dayjs())) {
                      return 'Vui lòng chọn ngày nghỉ sau hôm nay';
                    }
                  },
                }}
                variant="outlined"
              />
            </Grid>

            <Grid item>
              <MyInput
                fullWidth
                multiline
                rows={3}
                name="reason"
                label="Lý do"
                control={control}
                margin="normal"
                rules={{
                  required: 'Vui lòng nhập lý do xin nghỉ',
                  minLength: {
                    value: 10,
                    message: 'Vui lòng nhập lý do rõ ràng, tối thiểu 10 ký tự',
                  },
                }}
                variant="outlined"
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

export default AbsenceDialogForm;

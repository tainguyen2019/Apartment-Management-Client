import React, { useEffect } from 'react';
import { Button, DialogActions, DialogContent, Grid } from '@material-ui/core';
import { useForm, SubmitHandler } from 'react-hook-form';

import MyDialog from 'components/common/my-dialog';
import MyInput from 'components/common/my-input';
import { EventFormValues } from 'types/event';
import dayjs from 'dayjs';

interface EventDialogFormProps {
  title: string;
  initialValues: EventFormValues;
  open: boolean;
  loading: boolean;
  onSubmit: SubmitHandler<EventFormValues>;
  onClose?: React.MouseEventHandler;
}

const EventDialogForm: React.FC<EventDialogFormProps> = ({
  initialValues,
  loading,
  open,
  title,
  onSubmit,
  onClose,
}) => {
  const { handleSubmit, control, reset, getValues } = useForm({
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
            name="name"
            label="Tên sự kiện"
            control={control}
            margin="normal"
            rules={{
              required: 'Vui lòng nhập tên sự kiện ',
            }}
            variant="outlined"
          />
          <MyInput
            fullWidth
            type="date"
            name="date"
            label="Ngày tổ chức"
            InputLabelProps={{
              shrink: true,
            }}
            control={control}
            margin="normal"
            rules={{
              required: 'Vui lòng chọn ngày tổ chức',
              validate: (value) => {
                if (dayjs(value).isBefore(dayjs(), 'day')) {
                  return 'Vui lòng chọn ngày tổ chức từ hôm nay';
                }
              },
            }}
            variant="outlined"
          />
          <MyInput
            fullWidth
            name="start_time"
            type="time"
            label="Vào lúc"
            InputLabelProps={{
              shrink: true,
            }}
            control={control}
            margin="normal"
            rules={{
              required: 'Vui lòng chọn thời gian bắt đầu',
              validate: (value) => {
                const date = getValues('date');
                const end_time = getValues('end_time');

                const from = dayjs(`${date} ${value}`);
                const to = dayjs(`${date} ${end_time}`);

                if (from.isAfter(to)) {
                  return 'Thời gian bắt đầu phải nhỏ hơn thời gian kết thúc';
                }

                if (from.isBefore(dayjs(), 'm')) {
                  return 'Thời gian bắt đầu phải sau thời gian hiện tại';
                }
              },
            }}
            variant="outlined"
          />
          <MyInput
            fullWidth
            name="end_time"
            type="time"
            label="Kết thúc"
            InputLabelProps={{
              shrink: true,
            }}
            control={control}
            margin="normal"
            rules={{
              required: 'Vui lòng chọn thời gian kết thúc',
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

import React, { useContext, useEffect } from 'react';
import {
  Button,
  DialogActions,
  DialogContent,
  Grid,
  TextField,
} from '@material-ui/core';
import { useForm, SubmitHandler, DefaultValues } from 'react-hook-form';
import dayjs from 'dayjs';

import { CancelEventFormValues } from 'types/event';
import MyDialog from 'components/common/my-dialog';
import MyInput from 'components/common/my-input';
import useBackendServiceCallback from 'hooks/useBackendServiceCallback';
import eventService from 'services/event';
import useDidUpdate from 'hooks/useDidUpdate';
import { DATE_FORMAT } from 'constants/common';

import EventFormContext from '../../contexts/EventFormContext';
import CancelEventDialogContext from '../../contexts/CancelEventDialogContext';

const initialValues: DefaultValues<CancelEventFormValues> = {
  note: '',
};

const CancelDialogForm: React.FC = () => {
  const { onRefresh } = useContext(EventFormContext);
  const { open, event, onClose } = useContext(CancelEventDialogContext);
  const [{ loading, success }, cancelEvent] = useBackendServiceCallback(
    eventService.cancel,
  );
  const {
    handleSubmit: submitForm,
    control,
    reset,
  } = useForm({
    defaultValues: initialValues,
  });

  const handleSubmit: SubmitHandler<CancelEventFormValues> = ({ note }) => {
    cancelEvent(event!.id, note);
  };

  useEffect(() => {
    if (!open) {
      reset(initialValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useDidUpdate(() => {
    if (success) {
      setTimeout(onClose!, 500);
      setTimeout(onRefresh!, 1000);
    }
  }, [success]);

  if (!event) return null;
  const { apartment_number, block_number, date, start_time, end_time } = event;

  return (
    <MyDialog
      fullWidth
      loading={loading}
      open={open}
      title={'Hủy thông tin sự kiện'}
      onClose={onClose}
    >
      <form onSubmit={submitForm(handleSubmit)}>
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                disabled
                label="Căn hộ"
                variant="outlined"
                defaultValue={`${block_number}-${apartment_number}`}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                disabled
                label="date"
                variant="outlined"
                defaultValue={dayjs(date).format(DATE_FORMAT)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                disabled
                label="Bắt đầu"
                variant="outlined"
                defaultValue={start_time}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                disabled
                label="Kết thúc"
                variant="outlined"
                defaultValue={end_time}
              />
            </Grid>
            <Grid item xs={12}>
              <MyInput
                fullWidth
                autoFocus
                multiline
                rows={2}
                name="note"
                label="Lý do hủy sự kiện"
                control={control}
                margin="normal"
                rules={{
                  required: 'Vui lòng nhập lý do hủy sự kiện',
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

export default CancelDialogForm;

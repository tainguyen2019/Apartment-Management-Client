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

import { RejectAbsenceFormValues } from 'types/absence';
import MyDialog from 'components/common/my-dialog';
import MyInput from 'components/common/my-input';
import useBackendServiceCallback from 'hooks/useBackendServiceCallback';
import absenceService from 'services/absence';
import useDidUpdate from 'hooks/useDidUpdate';
import { DATE_FORMAT } from 'constants/common';

import AbsenceFormContext from '../../context/AbsenceFormContext';
import RejectAbsenceDialogContext from '../../context/RejectAbsenceDialogContext';

const initialValues: DefaultValues<RejectAbsenceFormValues> = {
  note: '',
};

const RejectDialogForm: React.FC = () => {
  const { onRefresh } = useContext(AbsenceFormContext);
  const { open, absence, onClose } = useContext(RejectAbsenceDialogContext);
  const [{ loading, success }, rejectAbsence] = useBackendServiceCallback(
    absenceService.reject,
  );
  const {
    handleSubmit: submitForm,
    control,
    reset,
  } = useForm({
    defaultValues: initialValues,
  });

  const handleSubmit: SubmitHandler<RejectAbsenceFormValues> = ({ note }) => {
    rejectAbsence(absence!.id, note);
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

  if (!absence) return null;
  const { date, staff_name, reason } = absence;

  return (
    <MyDialog
      fullWidth
      loading={loading}
      open={open}
      title="Từ chối đơn nghỉ phép"
      onClose={onClose}
    >
      <form onSubmit={submitForm(handleSubmit)}>
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                disabled
                label="Tên nhân viên"
                variant="outlined"
                defaultValue={staff_name}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                disabled
                label="Ngày nghỉ"
                variant="outlined"
                defaultValue={dayjs(date).format(DATE_FORMAT)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                disabled
                label="Lý do"
                variant="outlined"
                defaultValue={reason}
              />
            </Grid>

            <Grid item xs={12}>
              <MyInput
                fullWidth
                autoFocus
                multiline
                rows={2}
                name="note"
                label="Lý do từ chối đơn nghỉ phép"
                control={control}
                margin="normal"
                rules={{
                  required: 'Vui lòng nhập lý do từ chối đơn nghỉ phép',
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

export default RejectDialogForm;

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

import { RateRepair } from 'types/repair';
import MyDialog from 'components/common/my-dialog';
import useBackendServiceCallback from 'hooks/useBackendServiceCallback';
import repairService from 'services/repair';
import useDidUpdate from 'hooks/useDidUpdate';
import MySelect from 'components/common/my-select';
import { DATE_FORMAT } from 'constants/common';

import RateDialogContext from '../../contexts/RateDialogContext';
import RepairFormContext from 'containers/repair/contexts/RepairFormContext';

const initialValues: DefaultValues<RateRepair> = {
  rate: '',
};

const AssignmentDialogForm: React.FC = () => {
  const { onRefresh } = useContext(RepairFormContext);
  const { open, repair, onClose } = useContext(RateDialogContext);
  const [{ loading, success }, rateRepair] = useBackendServiceCallback(
    repairService.rate,
  );
  const {
    handleSubmit: submitForm,
    control,
    reset,
  } = useForm({
    defaultValues: initialValues,
  });

  const RATE_OPTIONS = ['Rất hài lòng', 'Hài lòng', 'Chưa hài lòng'].map(
    (rate) => ({
      label: rate,
      value: rate,
    }),
  );

  const handleSubmit: SubmitHandler<RateRepair> = ({ rate }) => {
    rateRepair(repair!.id, rate);
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

  if (!repair) return null;

  return (
    <MyDialog
      fullWidth
      loading={loading}
      open={open}
      title="Đánh giá mức độ hài lòng sửa chữa"
      onClose={onClose}
    >
      <form onSubmit={submitForm(handleSubmit)}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                disabled
                label="Căn hộ"
                variant="outlined"
                defaultValue={repair.apartment_number}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                disabled
                label="Block"
                variant="outlined"
                defaultValue={repair.block_number}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                disabled
                label="Nội dung sửa chữa"
                variant="outlined"
                defaultValue={repair.content}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                disabled
                label="Ngày dự kiến"
                variant="outlined"
                defaultValue={dayjs(repair.date).format(DATE_FORMAT)}
              />
            </Grid>
            <Grid item xs={12}>
              <MySelect
                fullWidth
                autoFocus
                name="rate"
                options={RATE_OPTIONS}
                label="Mức độ hài lòng"
                control={control}
                margin="normal"
                rules={{
                  required: 'Vui lòng chọn mức độ hài lòng',
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

export default AssignmentDialogForm;

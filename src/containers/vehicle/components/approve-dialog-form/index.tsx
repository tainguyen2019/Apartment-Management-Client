import React, { useContext, useEffect } from 'react';
import {
  Button,
  DialogActions,
  DialogContent,
  Grid,
  TextField,
} from '@material-ui/core';
import { useForm, SubmitHandler, DefaultValues } from 'react-hook-form';

import { ApproveVehicleFormValues } from 'types/vehicle';
import MyDialog from 'components/common/my-dialog';
import MyInput from 'components/common/my-input';

import useBackendServiceCallback from 'hooks/useBackendServiceCallback';
import vehicleService from 'services/vehicle';
import useDidUpdate from 'hooks/useDidUpdate';

import VehicleFormContext from '../../context/VehicleFormContext';
import ApproveVehicleDialogContext from '../../context/ApproveVehicleDialogContext';

const initialValues: DefaultValues<ApproveVehicleFormValues> = {
  parking_no: '',
};

const ApproveDialogForm: React.FC = () => {
  const { onRefresh } = useContext(VehicleFormContext);
  const { open, vehicle, onClose } = useContext(ApproveVehicleDialogContext);
  const [{ loading, success }, approveVehicle] = useBackendServiceCallback(
    vehicleService.approve,
  );
  const {
    handleSubmit: submitForm,
    control,
    reset,
  } = useForm({
    defaultValues: initialValues,
  });

  const handleSubmit: SubmitHandler<ApproveVehicleFormValues> = ({
    parking_no,
  }) => {
    approveVehicle({
      id: vehicle!.id,
      parking_no,
    });
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

  if (!vehicle) return null;

  return (
    <MyDialog
      fullWidth
      loading={loading}
      open={open}
      title="Duyệt thông tin đăng ký gửi xe"
      onClose={onClose}
    >
      <form onSubmit={submitForm(handleSubmit)}>
        <DialogContent>
          <Grid container direction="column" spacing={3}>
            <Grid item>
              <TextField
                fullWidth
                disabled
                label="Biển số xe"
                variant="outlined"
                defaultValue={vehicle.plate_number}
              />
            </Grid>
            <Grid item>
              <MyInput
                fullWidth
                autoFocus
                name="parking_no"
                label="Số thẻ gửi xe"
                control={control}
                margin="normal"
                rules={{
                  required: 'Vui lòng nhập số thẻ gửi xe',
                  pattern: {
                    value: /^\d{6}$/,
                    message: 'Số thẻ gửi xe bao gồm 6 chữ số. Ví dụ: 123456',
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

export default ApproveDialogForm;

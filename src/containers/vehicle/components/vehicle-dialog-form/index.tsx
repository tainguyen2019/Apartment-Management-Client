import React, { useEffect } from 'react';
import { Button, DialogActions, DialogContent, Grid } from '@material-ui/core';
import { useForm, SubmitHandler } from 'react-hook-form';

import MyDialog from 'components/common/my-dialog';
import MyInput from 'components/common/my-input';
import MySelect from 'components/common/my-select';
import { VehicleFormValues } from 'types/vehicle';

interface VehicleDialogFormProps {
  title: string;
  initialValues: VehicleFormValues;
  open: boolean;
  loading: boolean;
  onSubmit: SubmitHandler<VehicleFormValues>;
  onClose?: React.MouseEventHandler;
}

const VEHICLE_TYPES = ['Xe máy', 'Ô tô'];
const VEHICLE_TYPES_OPTIONS = VEHICLE_TYPES.map((type) => ({
  value: type,
  label: type,
}));

const VehicleDialogForm: React.FC<VehicleDialogFormProps> = ({
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
            name="plate_number"
            label="Biển số xe"
            control={control}
            margin="normal"
            rules={{
              required: 'Vui lòng nhập biển số xe',
              pattern: {
                value: /^\d{2}[A-Z]\d?-\d{2}(\d{2}|\d\.\d{2})$/,
                message:
                  'Biển số xe không hợp lệ. Ví dụ: 70H1-1234,70H1-123.45,70H-123.45,70H-1234',
              },
            }}
            variant="outlined"
          />
          <MyInput
            fullWidth
            name="identity_card_number"
            label="CMND / Thẻ căn cước"
            control={control}
            margin="normal"
            rules={{
              required: 'Vui lòng nhập số CMND hoặc thẻ căn cước',
              pattern: {
                value: /^[0-9]{12}$|^[0-9]{9}$/,
                message: 'Số CMND / Thẻ căn cước không đúng',
              },
            }}
            variant="outlined"
          />
          <MySelect
            fullWidth
            name="type"
            label="Loại xe"
            control={control}
            margin="normal"
            variant="outlined"
            rules={{
              required: 'Vui lòng chọn loại xe',
            }}
            options={VEHICLE_TYPES_OPTIONS}
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

export default VehicleDialogForm;

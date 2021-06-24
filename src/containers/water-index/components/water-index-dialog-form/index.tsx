import React, { useEffect } from 'react';
import { Button, DialogActions, DialogContent, Grid } from '@material-ui/core';
import { useForm, SubmitHandler, DefaultValues } from 'react-hook-form';

import MyDialog from 'components/common/my-dialog';
import MyInput from 'components/common/my-input';
import { WaterIndexFormValues } from 'types/water-index';
import ApartmentInput from 'components/common/apartment-input';
import NumberInput from 'components/common/number-input';

interface WaterIndexDialogFormProps {
  title: string;
  initialValues: DefaultValues<WaterIndexFormValues>;
  open: boolean;
  loading: boolean;
  mode: 'create' | 'update';
  onSubmit: SubmitHandler<WaterIndexFormValues>;
  onClose?: React.MouseEventHandler;
}

const WaterIndexDialogForm: React.FC<WaterIndexDialogFormProps> = ({
  initialValues,
  loading,
  open,
  title,
  mode,
  onSubmit,
  onClose,
}) => {
  const { handleSubmit, control, reset, setValue, watch } = useForm({
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
          <Grid container spacing={2}>
            {mode === 'create' && (
              <Grid item xs={6}>
                <ApartmentInput
                  name="apartment_id"
                  control={control}
                  setValue={setValue}
                  rules={{
                    required: 'Vui lòng nhập căn hộ',
                  }}
                />
              </Grid>
            )}
            {mode === 'update' && (
              <Grid item xs={6}>
                <MyInput
                  fullWidth
                  name="apartment_number"
                  label="Căn hộ"
                  control={control}
                  variant="outlined"
                  inputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
            )}
            <Grid item xs={6}>
              <MyInput
                fullWidth
                name="date"
                type="date"
                label="Ngày"
                control={control}
                rules={{
                  required: 'Vui lòng nhập ngày',
                }}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6}>
              <NumberInput
                fullWidth
                name="start_index"
                control={control}
                label="Chỉ số cũ"
                variant="outlined"
                helperText={`
                Bỏ trống chỉ số này nếu sử dụng chỉ số của kỳ trước. 
                Nhập 0 nếu muốn cập nhật lại chỉ số nước của đồng hồ
                `}
              />
            </Grid>
            <Grid item xs={6}>
              <NumberInput
                fullWidth
                name="end_index"
                label="Chỉ số mới"
                control={control}
                rules={{
                  required: 'Vui lòng nhập chỉ số mới',
                  min: {
                    value: 1,
                    message: 'Chỉ số mới phải lớn hơn 0',
                  },
                  validate: (value) => {
                    const val = Number(value);
                    const startVal = watch('start_index');

                    if (startVal && val <= Number(startVal))
                      return 'Chỉ số mới phải lớn hơn chỉ số cũ.';
                    return undefined;
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

export default WaterIndexDialogForm;

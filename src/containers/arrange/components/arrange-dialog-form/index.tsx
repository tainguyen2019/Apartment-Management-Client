import React, { useEffect } from 'react';
import { Button, DialogActions, DialogContent, Grid } from '@material-ui/core';
import { useForm, SubmitHandler } from 'react-hook-form';

import MyDialog from 'components/common/my-dialog';
import MyInput from 'components/common/my-input';
import { ArrangeFormValues } from 'types/arrange';
import DeviceSelect from 'components/common/device-select';
import AreaSelect from 'components/common/area-select';

interface ArrangeDialogFormProps {
  title: string;
  initialValues: ArrangeFormValues;
  open: boolean;
  loading: boolean;
  onSubmit: SubmitHandler<ArrangeFormValues>;
  onClose?: React.MouseEventHandler;
}

const ArrangeDialogForm: React.FC<ArrangeDialogFormProps> = ({
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
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <DeviceSelect
                autoFocus
                fullWidth
                SelectProps={{
                  MenuProps: {
                    PaperProps: {
                      style: {
                        maxHeight: '200px',
                      },
                    },
                  },
                }}
                name="device_id"
                label="Thiết bị"
                control={control}
                rules={{
                  required: 'Vui lòng chọn thiết bị',
                }}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6}>
              <AreaSelect
                autoFocus
                fullWidth
                SelectProps={{
                  MenuProps: {
                    PaperProps: {
                      style: {
                        maxHeight: '200px',
                      },
                    },
                  },
                }}
                name="area_id"
                label="Khu vực"
                control={control}
                rules={{
                  required: 'Vui lòng chọn khu vực',
                }}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6}>
              <MyInput
                fullWidth
                type="number"
                name="quantity"
                label="Số lượng"
                InputLabelProps={{
                  shrink: true,
                }}
                control={control}
                margin="normal"
                rules={{
                  required: 'Vui lòng nhập số lượng',
                  validate: (value) => {
                    if (value < 1) {
                      return 'Vui lòng nhập số lượng lớn hơn không';
                    }
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

export default ArrangeDialogForm;

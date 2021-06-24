import React from 'react';
import { Button, DialogActions, DialogContent, Grid } from '@material-ui/core';
import { useForm, SubmitHandler } from 'react-hook-form';

import MyInput from 'components/common/my-input';
import { DeviceFormValues } from 'types/device';
import MyDialog from 'components/common/my-dialog';

type DeviceFormProps = {
  title: string;
  initialValues: DeviceFormValues;
  open: boolean;
  loading: boolean;
  onSubmit: SubmitHandler<DeviceFormValues>;
  onClose: React.MouseEventHandler;
};

const DeviceForm: React.FC<DeviceFormProps> = (props) => {
  const { title, initialValues, open, loading, onSubmit, onClose } = props;
  const { handleSubmit, control } = useForm<DeviceFormValues>({
    defaultValues: initialValues,
  });

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
            autoFocus
            name="name"
            label="Tên thiết bị"
            control={control}
            margin="normal"
            rules={{
              required: 'Vui lòng nhập tên thiết bị',
            }}
            variant="outlined"
          />
          <MyInput
            fullWidth
            multiline
            rows="3"
            name="description"
            label="Mô tả"
            control={control}
            margin="normal"
            rules={{
              required: 'Vui lòng nhập nội dung mô tả cho thiết bị',
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

export default DeviceForm;

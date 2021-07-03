import React from 'react';
import { Button, DialogActions, DialogContent, Grid } from '@material-ui/core';
import { useForm, SubmitHandler } from 'react-hook-form';

import MyInput from 'components/common/my-input';
import { AreaFormValues } from 'types/area';
import MyDialog from 'components/common/my-dialog';

type AreaFormProps = {
  title: string;
  initialValues: AreaFormValues;
  open: boolean;
  loading: boolean;
  onSubmit: SubmitHandler<AreaFormValues>;
  onClose: React.MouseEventHandler;
};

const FeeForm: React.FC<AreaFormProps> = (props) => {
  const { title, initialValues, open, loading, onSubmit, onClose } = props;
  const { handleSubmit, control } = useForm<AreaFormValues>({
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
            name="building"
            label="Tòa nhà"
            control={control}
            margin="normal"
            rules={{
              required: 'Vui lòng nhập tòa nhà',
            }}
            variant="outlined"
          />
          <MyInput
            fullWidth
            name="location"
            label="Vị trí/ Khu vực"
            control={control}
            margin="normal"
            rules={{
              required: 'Vui lòng nhập vị trí/ khu vực',
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

export default FeeForm;

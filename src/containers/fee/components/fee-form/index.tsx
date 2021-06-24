import React from 'react';
import { Button, DialogActions, DialogContent, Grid } from '@material-ui/core';
import { useForm, SubmitHandler } from 'react-hook-form';

import MyInput from 'components/common/my-input';
import { FeeFormValues } from 'types/fee';
import MyDialog from 'components/common/my-dialog';
import NumberInput from 'components/common/number-input';

type FeeFormProps = {
  title: string;
  initialValues: FeeFormValues;
  open: boolean;
  loading: boolean;
  onSubmit: SubmitHandler<FeeFormValues>;
  onClose: React.MouseEventHandler;
};

const FeeForm: React.FC<FeeFormProps> = (props) => {
  const { title, initialValues, open, loading, onSubmit, onClose } = props;
  const { handleSubmit, control } = useForm<FeeFormValues>({
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
            label="Tên phí"
            control={control}
            margin="normal"
            rules={{
              required: 'Vui lòng nhập phí',
            }}
            variant="outlined"
          />
          <MyInput
            fullWidth
            name="unit"
            label="Đơn vị tính"
            control={control}
            margin="normal"
            rules={{
              required: 'Vui lòng nhập đơn vị tính',
            }}
            variant="outlined"
          />

          <NumberInput
            fullWidth
            name="amount"
            label="Mức giá"
            control={control}
            margin="normal"
            rules={{
              required: 'Vui lòng nhập mức giá áp dụng',
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

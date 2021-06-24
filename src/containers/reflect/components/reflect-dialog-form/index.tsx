import React, { useEffect } from 'react';
import { Button, DialogActions, DialogContent, Grid } from '@material-ui/core';
import { useForm, SubmitHandler } from 'react-hook-form';

import MyDialog from 'components/common/my-dialog';
import MyInput from 'components/common/my-input';
import DepartmentSelect from 'components/common/department-select';
import { ReflectFormValues } from 'types/reflect';

interface ReflectDialogFormProps {
  title: string;
  initialValues: ReflectFormValues;
  open: boolean;
  loading: boolean;
  onSubmit: SubmitHandler<ReflectFormValues>;
  onClose?: React.MouseEventHandler;
}

const ReflectDialogForm: React.FC<ReflectDialogFormProps> = ({
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
            autoFocus
            name="title"
            label="Tiêu đề"
            control={control}
            margin="normal"
            rules={{
              required: 'Vui lòng nhập tiêu đề phản ánh',
            }}
            variant="outlined"
          />
          <MyInput
            fullWidth
            multiline
            name="content"
            label="Nội dung phản ánh"
            control={control}
            margin="normal"
            rules={{
              required: 'Vui lòng nhập nội dung phản ánh',
            }}
            variant="outlined"
            rows={4}
          />
          <DepartmentSelect
            fullWidth
            name="department_id"
            label="Bộ phận tiếp nhận"
            control={control}
            margin="normal"
            variant="outlined"
            rules={{
              required: 'Vui lòng chọn bộ phận tiếp nhận',
            }}
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

export default ReflectDialogForm;

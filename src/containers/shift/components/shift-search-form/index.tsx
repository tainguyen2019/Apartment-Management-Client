import { Grid } from '@material-ui/core';
import { Control } from 'react-hook-form';

import MyInput from 'components/common/my-input';
import MySelect from 'components/common/my-select';
import { ShiftSearchFormValues } from 'types/shift';
import AreaSelect from 'components/common/area-select';

interface ShiftSearchFormProps {
  control: Control<ShiftSearchFormValues>;
}

const SHIFT_OPTIONS = ['Tất cả', '1', '2'].map((shift) => ({
  value: shift,
  label: shift,
}));

const DEPARTNAME_OPTIONS = ['Tất cả', 'Bộ phận vệ sinh', 'Bộ phận an ninh'].map(
  (dep) => ({
    value: dep,
    label: dep,
  }),
);

const ShiftSearchForm: React.FC<ShiftSearchFormProps> = ({ control }) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={4}>
        <MyInput
          fullWidth
          name="staff_name"
          label="Tên nhân viên"
          control={control}
          variant="outlined"
        />
      </Grid>
      <Grid item xs={4}>
        <MyInput
          fullWidth
          name="description"
          label="Công việc"
          control={control}
          variant="outlined"
        />
      </Grid>
      <Grid item xs={4}>
        <AreaSelect
          fullWidth
          usingDefaultOption
          name="area_id"
          label="Khu vực"
          control={control}
          variant="outlined"
        />
      </Grid>
      <Grid item xs={4}>
        <MySelect
          fullWidth
          name="shift"
          label="Ca trực"
          control={control}
          variant="outlined"
          options={SHIFT_OPTIONS}
        />
      </Grid>
      <Grid item xs={4}>
        <MyInput
          fullWidth
          size="medium"
          name="from_date"
          label="Từ ngày"
          type="date"
          control={control}
          variant="outlined"
        />
      </Grid>
      <Grid item xs={4}>
        <MyInput
          fullWidth
          size="medium"
          name="to_date"
          label="Đến ngày"
          type="date"
          control={control}
          variant="outlined"
        />
      </Grid>
      <Grid item xs={4}>
        <MySelect
          fullWidth
          options={DEPARTNAME_OPTIONS}
          name="department_name"
          label="Bộ phận"
          control={control}
          variant="outlined"
        />
      </Grid>
    </Grid>
  );
};

export default ShiftSearchForm;

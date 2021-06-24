import { Grid } from '@material-ui/core';
import { Control } from 'react-hook-form';

import MyInput from 'components/common/my-input';
import MySelect from 'components/common/my-select';
import DepartmentSelect from 'components/common/department-select';

import { ReflectSearchFormValues } from 'types/reflect';

interface ReflectSearchFormProps {
  control: Control<ReflectSearchFormValues>;
}

const REFLECT_STATUS = ['Tất cả', 'Chờ trả lời', 'Đã trả lời'];
const REFLECT_STATUS_OPTIONS = REFLECT_STATUS.map((status) => ({
  value: status,
  label: status,
}));

const ReflectSearchForm: React.FC<ReflectSearchFormProps> = ({ control }) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={4}>
        <MyInput
          fullWidth
          name="apartment_number"
          label="Số căn hộ"
          control={control}
          variant="outlined"
        />
      </Grid>
      <Grid item xs={4}>
        <MyInput
          fullWidth
          name="block_number"
          label="Block"
          control={control}
          variant="outlined"
        />
      </Grid>
      <Grid item xs={4}>
        <MyInput
          fullWidth
          name="title"
          label="Tiêu đề"
          control={control}
          variant="outlined"
        />
      </Grid>
      <Grid item xs={4}>
        <DepartmentSelect
          fullWidth
          usingDefaultOption
          name="department_id"
          label="Bộ phận"
          control={control}
          variant="outlined"
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
          name="status"
          label="Trạng thái"
          control={control}
          variant="outlined"
          options={REFLECT_STATUS_OPTIONS}
        />
      </Grid>
    </Grid>
  );
};

export default ReflectSearchForm;

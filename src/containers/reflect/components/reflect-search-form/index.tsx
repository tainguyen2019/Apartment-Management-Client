import { Grid } from '@material-ui/core';
import { Control } from 'react-hook-form';

import MyInput from 'components/common/my-input';
import MySelect from 'components/common/my-select';
import DepartmentSelect from 'components/common/department-select';
import Restriction from 'components/common/restriction';
import { ReflectSearchFormValues } from 'types/reflect';
import storageService from 'services/storage';

interface ReflectSearchFormProps {
  control: Control<ReflectSearchFormValues>;
}

const REFLECT_STATUS = ['Tất cả', 'Chờ trả lời', 'Đã trả lời'];
const REFLECT_STATUS_OPTIONS = REFLECT_STATUS.map((status) => ({
  value: status,
  label: status,
}));

const ReflectSearchForm: React.FC<ReflectSearchFormProps> = ({ control }) => {
  const staff_id = storageService.getItem<string>('staff_id') || '';
  const apartment_id = storageService.getItem<string>('apartment_id') || '';

  return (
    <Grid container spacing={3}>
      <Restriction available={Boolean(staff_id)}>
        <Grid item xs={12} sm={6} lg={4}>
          <MyInput
            fullWidth
            name="apartment_number"
            label="Số căn hộ"
            control={control}
            variant="outlined"
          />
        </Grid>
      </Restriction>
      <Restriction available={Boolean(staff_id)}>
        <Grid item xs={12} sm={6} lg={4}>
          <MyInput
            fullWidth
            name="block_number"
            label="Block"
            control={control}
            variant="outlined"
          />
        </Grid>
      </Restriction>
      <Grid item xs={12} sm={6} lg={4}>
        <MyInput
          fullWidth
          name="title"
          label="Tiêu đề"
          control={control}
          variant="outlined"
        />
      </Grid>
      <Restriction available={Boolean(apartment_id)}>
        <Grid item xs={12} sm={6} lg={4}>
          <DepartmentSelect
            fullWidth
            usingDefaultOption
            name="department_id"
            label="Bộ phận"
            control={control}
            variant="outlined"
          />
        </Grid>
      </Restriction>
      <Grid item xs={12} sm={6} lg={4}>
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
      <Grid item xs={12} sm={6} lg={4}>
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
      <Grid item xs={12} sm={6} lg={4}>
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

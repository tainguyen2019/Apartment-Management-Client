import { Grid } from '@material-ui/core';
import { Control } from 'react-hook-form';

import MyInput from 'components/common/my-input';
import MySelect from 'components/common/my-select';
import { RepairSearchFormValues } from 'types/repair';

interface RepairSearchFormProps {
  control: Control<RepairSearchFormValues>;
}

const REPAIR_STATUS = [
  'Tất cả',
  'Chờ xử lý',
  'Đã phân công',
  'Đã xử lý',
  'Đã đánh giá',
];
const REPAIR_RATE = ['Tất cả', 'Rất hài lòng', 'Hài lòng', 'Chưa hài lòng'];
const REPAIR_STATUS_OPTIONS = REPAIR_STATUS.map((status) => ({
  value: status,
  label: status,
}));
const REPAIR_RATE_OPTIONS = REPAIR_RATE.map((rate) => ({
  value: rate,
  label: rate,
}));
/*
  rate: string;
  status: string;
  content: string;
  apartment_number: string;
  block_number: string;
  staff_name: string;
*/

const RepairSearchForm: React.FC<RepairSearchFormProps> = ({ control }) => {
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
          name="content"
          label="Nội dung sửa chữa"
          control={control}
          variant="outlined"
        />
      </Grid>
      <Grid item xs={4}>
        <MyInput
          fullWidth
          name="staff_name"
          label="Người phụ trách"
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
          options={REPAIR_STATUS_OPTIONS}
        />
      </Grid>
      <Grid item xs={4}>
        <MySelect
          fullWidth
          name="rate"
          label="Mức độ đánh giá"
          control={control}
          variant="outlined"
          options={REPAIR_RATE_OPTIONS}
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
    </Grid>
  );
};

export default RepairSearchForm;

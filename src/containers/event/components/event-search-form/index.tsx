import { Grid } from '@material-ui/core';
import { Control } from 'react-hook-form';

import MyInput from 'components/common/my-input';
import MySelect from 'components/common/my-select';
import Restriction from 'components/common/restriction';
import storageService from 'services/storage';
import { EventSearchFormValues } from 'types/event';

interface EventSearchFormProps {
  control: Control<EventSearchFormValues>;
}

const EVENT_STATUS = ['Tất cả', 'Chờ xử lý', 'Đã phê duyệt', 'Đã hủy'];
const EVENT_STATUS_OPTIONS = EVENT_STATUS.map((status) => ({
  value: status,
  label: status,
}));

const EventSearchForm: React.FC<EventSearchFormProps> = ({ control }) => {
  const staff_id = storageService.getItem<string>('staff_id') || '';

  return (
    <Grid container spacing={3}>
      <Restriction available={Boolean(staff_id)}>
        <Grid item xs={4}>
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
        <Grid item xs={4}>
          <MyInput
            fullWidth
            name="block_number"
            label="Block"
            control={control}
            variant="outlined"
          />
        </Grid>
      </Restriction>
      <Grid item xs={4}>
        <MyInput
          fullWidth
          name="name"
          label="Tên sự kiện"
          control={control}
          variant="outlined"
        />
      </Grid>
      <Grid item xs={4}>
        <MyInput
          fullWidth
          name="staff_name"
          label="Người phê duyệt"
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
          options={EVENT_STATUS_OPTIONS}
        />
      </Grid>
    </Grid>
  );
};

export default EventSearchForm;

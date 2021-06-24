import { Grid } from '@material-ui/core';
import { Control } from 'react-hook-form';
import MyInput from 'components/common/my-input';
import MySelect from 'components/common/my-select';

import { NotificationSearchFormValues } from 'types/notification';

interface NotificationSearchFormProps {
  control: Control<NotificationSearchFormValues>;
}

const NOTIFICATION_STATUSES = ['Tất cả', 'Chưa đăng', 'Đã đăng'];
const NOTIFICATION_STATUS_OPTIONS = NOTIFICATION_STATUSES.map((type) => ({
  value: type,
  label: type,
}));

const NotificationSearchForm: React.FC<NotificationSearchFormProps> = ({
  control,
}) => (
  <Grid container spacing={3}>
    <Grid item lg={4} xs={12}>
      <MyInput
        fullWidth
        size="medium"
        name="title"
        label="Tiêu đề"
        control={control}
        variant="outlined"
      />
    </Grid>
    <Grid item lg={4} xs={12}>
      <MyInput
        fullWidth
        size="medium"
        name="from_date"
        type="date"
        label="Từ ngày"
        control={control}
        variant="outlined"
      />
    </Grid>
    <Grid item lg={4} xs={12}>
      <MyInput
        fullWidth
        size="medium"
        name="to_date"
        type="date"
        label="Tới ngày"
        control={control}
        variant="outlined"
      />
    </Grid>
    <Grid item lg={4} xs={12}>
      <MySelect
        fullWidth
        size="medium"
        name="status"
        label="Trạng thái"
        control={control}
        variant="outlined"
        options={NOTIFICATION_STATUS_OPTIONS}
      />
    </Grid>
  </Grid>
);

export default NotificationSearchForm;
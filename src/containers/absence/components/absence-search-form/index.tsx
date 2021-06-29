import { Grid } from '@material-ui/core';
import { Control } from 'react-hook-form';
import MyInput from 'components/common/my-input';
import MySelect from 'components/common/my-select';
import DepartmentSelect from 'components/common/department-select';

import { AbsenceSearchFormValues } from 'types/absence';

interface AbsenceSearchFormProps {
  control: Control<AbsenceSearchFormValues>;
}

const ABSENCE_STATUSES = ['Tất cả', 'Chờ xử lý', 'Đã phê duyệt', 'Bị từ chối'];
const ABSENCE_STATUS_OPTIONS = ABSENCE_STATUSES.map((type) => ({
  value: type,
  label: type,
}));

const AbsenceSearchForm: React.FC<AbsenceSearchFormProps> = ({ control }) => (
  <Grid container spacing={3}>
    <Grid item xs={12} sm={6} lg={4}>
      <MyInput
        fullWidth
        size="medium"
        name="staff_name"
        label="Tên nhân viên"
        control={control}
        variant="outlined"
      />
    </Grid>
    <Grid item xs={12} sm={6} lg={4}>
      <DepartmentSelect
        fullWidth
        usingDefaultOption
        name="department_id"
        label="Phòng ban"
        control={control}
        variant="outlined"
      />
    </Grid>
    <Grid item xs={12} sm={6} lg={4}>
      <MySelect
        fullWidth
        size="medium"
        name="status"
        label="Trạng thái"
        control={control}
        variant="outlined"
        options={ABSENCE_STATUS_OPTIONS}
      />
    </Grid>
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
  </Grid>
);

export default AbsenceSearchForm;

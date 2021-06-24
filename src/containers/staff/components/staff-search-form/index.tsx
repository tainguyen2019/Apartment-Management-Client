import { Grid } from '@material-ui/core';
import { Control } from 'react-hook-form';

import MyInput from 'components/common/my-input';
import MySelect from 'components/common/my-select';
import { StaffSearchFormValues } from 'types/staff';
import DepartmentSelect from 'components/common/department-select';

interface StaffSearchFormProps {
  control: Control<StaffSearchFormValues>;
}

const STAFF_STATUS = ['Tất cả', 'Đang làm việc', 'Đã nghỉ'];
const STAFF_STATUS_OPTIONS = STAFF_STATUS.map((type) => ({
  value: type,
  label: type,
}));

const StaffSearchForm: React.FC<StaffSearchFormProps> = ({ control }) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={4}>
        <MyInput
          fullWidth
          name="name"
          label="Tên nhân viên"
          control={control}
          variant="outlined"
        />
      </Grid>
      <Grid item xs={4}>
        <MyInput
          fullWidth
          name="phone"
          label="SDT"
          control={control}
          variant="outlined"
        />
      </Grid>
      <Grid item xs={4}>
        <DepartmentSelect
          fullWidth
          usingDefaultOption
          SelectProps={{
            MenuProps: {
              PaperProps: {
                style: {
                  maxHeight: '200px',
                },
              },
            },
          }}
          name="department_id"
          label="Bộ phận"
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
          options={STAFF_STATUS_OPTIONS}
        />
      </Grid>
    </Grid>
  );
};

export default StaffSearchForm;

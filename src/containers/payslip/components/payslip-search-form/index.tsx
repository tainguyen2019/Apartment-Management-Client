import { Grid } from '@material-ui/core';
import { Control } from 'react-hook-form';

import MyInput from 'components/common/my-input';
import { PayslipSearchFormValues } from 'types/payslip';

interface PayslipSearchFormProps {
  control: Control<PayslipSearchFormValues>;
}

const PayslipSearchForm: React.FC<PayslipSearchFormProps> = ({ control }) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={4}>
        <MyInput
          fullWidth
          name="content"
          label="Nội dung chi"
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
        <MyInput
          fullWidth
          name="staff_name"
          label="Người lập"
          control={control}
          variant="outlined"
        />
      </Grid>
    </Grid>
  );
};

export default PayslipSearchForm;

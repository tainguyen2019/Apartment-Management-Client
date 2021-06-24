import { Grid } from '@material-ui/core';
import { Control } from 'react-hook-form';
import MyInput from 'components/common/my-input';
import MySelect from 'components/common/my-select';

import { WaterIndexSearchFormValues } from 'types/water-index';
import { STATUS_OPTIONS } from 'constants/water-index';

interface WaterIndexSearchFormProps {
  control: Control<WaterIndexSearchFormValues>;
}

const WaterIndexSearchForm: React.FC<WaterIndexSearchFormProps> = ({
  control,
}) => (
  <Grid container spacing={3}>
    <Grid item xs={12} md={6} lg={4}>
      <MyInput
        fullWidth
        size="medium"
        name="apartment_number"
        label="Số căn hộ"
        control={control}
        variant="outlined"
      />
    </Grid>
    <Grid item xs={12} md={6} lg={4}>
      <MyInput
        fullWidth
        size="medium"
        name="block_number"
        label="Block"
        control={control}
        variant="outlined"
      />
    </Grid>
    <Grid item xs={12} md={6} lg={4}>
      <MySelect
        fullWidth
        size="medium"
        name="status"
        label="Trạng thái"
        control={control}
        variant="outlined"
        options={STATUS_OPTIONS}
      />
    </Grid>
    <Grid item xs={12} md={6} lg={4}>
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
    <Grid item xs={12} md={6} lg={4}>
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

export default WaterIndexSearchForm;

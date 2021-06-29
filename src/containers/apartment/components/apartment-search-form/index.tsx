import { Grid } from '@material-ui/core';
import { Control } from 'react-hook-form';
import MyInput from 'components/common/my-input';
import MySelect from 'components/common/my-select';

import { ApartmentSearchFormValues } from 'types/apartment';

interface ApartmentSearchFormProps {
  control: Control<ApartmentSearchFormValues>;
}

const APARTMENT_TYPES = ['Tất cả', 'Nhà ở thường', 'ShopHouse'];
const APARTMENT_TYPES_OPTIONS = APARTMENT_TYPES.map((type) => ({
  value: type,
  label: type,
}));

const ApartmentSearchForm: React.FC<ApartmentSearchFormProps> = ({
  control,
}) => (
  <Grid container spacing={3}>
    <Grid item xs={12} sm={6} lg={4}>
      <MyInput
        fullWidth
        size="medium"
        name="apartment_number"
        label="Số căn hộ"
        control={control}
        variant="outlined"
      />
    </Grid>
    <Grid item xs={12} sm={6} lg={4}>
      <MyInput
        fullWidth
        size="medium"
        name="block_number"
        label="Block"
        control={control}
        variant="outlined"
      />
    </Grid>
    <Grid item xs={12} sm={6} lg={4}>
      <MySelect
        fullWidth
        size="medium"
        name="type"
        label="Loại"
        control={control}
        variant="outlined"
        options={APARTMENT_TYPES_OPTIONS}
      />
    </Grid>
    <Grid item xs={12} sm={6} lg={4}>
      <MyInput
        fullWidth
        size="medium"
        name="host"
        label="Họ tên chủ căn hộ"
        control={control}
        variant="outlined"
      />
    </Grid>
    <Grid item xs={12} sm={6} lg={4}>
      <MyInput
        fullWidth
        size="medium"
        name="phone"
        label="Số điện thoại"
        control={control}
        variant="outlined"
      />
    </Grid>
    <Grid item xs={12} sm={6} lg={4}>
      <MyInput
        fullWidth
        size="medium"
        name="email"
        label="Email"
        control={control}
        variant="outlined"
      />
    </Grid>
  </Grid>
);

export default ApartmentSearchForm;

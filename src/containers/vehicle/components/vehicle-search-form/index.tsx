import { Grid } from '@material-ui/core';
import { Control } from 'react-hook-form';
import MyInput from 'components/common/my-input';
import MySelect from 'components/common/my-select';
import Restriction from 'components/common/restriction';

import { VehicleSearchFormValues } from 'types/vehicle';
import storageService from 'services/storage';

interface VehicleSearchFormProps {
  control: Control<VehicleSearchFormValues>;
}

const VEHICLE_TYPES = ['Tất cả', 'Xe máy', 'Ô tô'];
const VEHICLE_STATUS = ['Tất cả', 'Đang gửi', 'Chờ xử lý', 'Đã hủy'];
const VEHICLE_TYPES_OPTIONS = VEHICLE_TYPES.map((type) => ({
  value: type,
  label: type,
}));
const VEHICLE_STATUS_OPTIONS = VEHICLE_STATUS.map((status) => ({
  value: status,
  label: status,
}));

const VehicleSearchForm: React.FC<VehicleSearchFormProps> = ({ control }) => {
  const staff_id = storageService.getItem<string>('staff_id');

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} lg={4}>
        <MyInput
          fullWidth
          size="medium"
          name="plate_number"
          label="Biển số xe"
          control={control}
          variant="outlined"
        />
      </Grid>
      <Restriction available={Boolean(staff_id)}>
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
      </Restriction>
      <Restriction available={Boolean(staff_id)}>
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
      </Restriction>
      <Grid item xs={12} sm={6} lg={4}>
        <MyInput
          fullWidth
          size="medium"
          name="identity_card_number"
          label="CMND / Thẻ căn cước"
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
          options={VEHICLE_TYPES_OPTIONS}
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
          options={VEHICLE_STATUS_OPTIONS}
        />
      </Grid>
      <Grid item xs={12} sm={6} lg={4}>
        <MyInput
          fullWidth
          size="medium"
          name="parking_no"
          label="Thẻ gửi xe"
          control={control}
          variant="outlined"
        />
      </Grid>
    </Grid>
  );
};

export default VehicleSearchForm;

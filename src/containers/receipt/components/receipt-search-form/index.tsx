import { Grid } from '@material-ui/core';
import { Control } from 'react-hook-form';

import MyInput from 'components/common/my-input';
import MySelect from 'components/common/my-select';
import Restriction from 'components/common/restriction';
import storageService from 'services/storage';
import { ReceiptSearchFormValues } from 'types/receipt';

interface ReceiptSearchFormProps {
  control: Control<ReceiptSearchFormValues>;
}

const RECEIPT_STATUS = ['Tất cả', 'Chưa thanh toán', 'Đã thanh toán'];
const RECEIPT_STATUS_OPTIONS = RECEIPT_STATUS.map((status) => ({
  value: status,
  label: status,
}));

const ReceiptSearchForm: React.FC<ReceiptSearchFormProps> = ({ control }) => {
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
          name="content"
          label="Nội dung thu"
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
          options={RECEIPT_STATUS_OPTIONS}
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

export default ReceiptSearchForm;

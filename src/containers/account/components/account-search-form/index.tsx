import { Grid } from '@material-ui/core';
import { Control } from 'react-hook-form';

import MyInput from 'components/common/my-input';
import MySelect from 'components/common/my-select';
import RoleSelect from 'components/common/role-select';

import { SearchAccountFormValues } from 'types/account';

interface AccountSearchFormProps {
  control: Control<SearchAccountFormValues>;
}

const ACCOUNT_TYPES = {
  'Tất cả': 'Tất cả',
  internal: 'internal',
  external: 'external',
};

const ACCOUNT_TYPE_OPTIONS = Object.entries(ACCOUNT_TYPES).map(
  ([value, label]) => ({
    value,
    label,
  }),
);

const AccountSearchForm: React.FC<AccountSearchFormProps> = ({ control }) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={4}>
        <MyInput
          fullWidth
          name="username"
          label="Tên tài khoản"
          control={control}
          variant="outlined"
        />
      </Grid>
      <Grid item xs={4}>
        <RoleSelect
          usingDefaultOption
          fullWidth
          name="role_id"
          label="Role"
          control={control}
          variant="outlined"
        />
      </Grid>
      <Grid item xs={4}>
        <MySelect
          fullWidth
          name="type"
          label="Loại"
          control={control}
          variant="outlined"
          options={ACCOUNT_TYPE_OPTIONS}
        />
      </Grid>
      <Grid item xs={4}>
        <MyInput
          fullWidth
          type="date"
          name="from_date"
          label="Từ ngày"
          control={control}
          variant="outlined"
        />
      </Grid>
      <Grid item xs={4}>
        <MyInput
          fullWidth
          type="date"
          name="to_date"
          label="Đến ngày"
          control={control}
          variant="outlined"
        />
      </Grid>
    </Grid>
  );
};

export default AccountSearchForm;

import { Grid } from '@material-ui/core';
import { Control } from 'react-hook-form';

import MyInput from 'components/common/my-input';
import { ArrangeSearchFormValues } from 'types/arrange';
import AreaSelect from 'components/common/area-select';

interface ArrangeSearchFormProps {
  control: Control<ArrangeSearchFormValues>;
}

const ArrangeSearchForm: React.FC<ArrangeSearchFormProps> = ({ control }) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} lg={4}>
        <AreaSelect
          autoFocus
          usingDefaultOption
          fullWidth
          SelectProps={{
            MenuProps: {
              PaperProps: {
                style: {
                  maxHeight: '200px',
                },
              },
            },
          }}
          name="area_id"
          label="Khu vực"
          control={control}
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12} sm={6} lg={4}>
        <MyInput
          fullWidth
          name="device_name"
          label="Thiết bị"
          control={control}
          variant="outlined"
        />
      </Grid>
    </Grid>
  );
};

export default ArrangeSearchForm;

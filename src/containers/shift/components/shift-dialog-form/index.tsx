import React, { useEffect } from 'react';
import { Button, DialogActions, DialogContent, Grid } from '@material-ui/core';
import { useForm, SubmitHandler } from 'react-hook-form';
import dayjs from 'dayjs';

import MyDialog from 'components/common/my-dialog';
import MyInput from 'components/common/my-input';
import MySelect from 'components/common/my-select';
import { ShiftFormValues } from 'types/shift';
import { FIELD_DATE_FORMAT } from 'constants/common';
import AreaSelect from 'components/common/area-select';
import useEffectOnce from 'hooks/useEffectOnce';
import useShallowEqualSelector from 'hooks/useShallowEqualSelector';
import useActions from 'hooks/useActions';
import { selectShiftStaffState } from 'selectors/shiftStaff';
import * as actionCreators from 'redux/shift-staff/actionCreators';
// import Spin from 'ui/spin';

interface ShiftDialogFormProps {
  title: string;
  initialValues: ShiftFormValues;
  open: boolean;
  loading: boolean;
  onSubmit: SubmitHandler<ShiftFormValues>;
  onClose: React.MouseEventHandler;
}

const ShiftDialogForm: React.FC<ShiftDialogFormProps> = ({
  initialValues,
  loading,
  open,
  title,
  onSubmit,
  onClose,
}) => {
  const { handleSubmit, control, reset } = useForm({
    defaultValues: initialValues,
  });

  const [getStaffSelectOptions] = useActions(
    actionCreators.getStaffSelectOptions,
  );
  const { staffs } = useShallowEqualSelector(selectShiftStaffState);

  const selectStaffOptions = staffs.map(({ id, name }) => ({
    label: name,
    value: id,
  }));

  useEffectOnce(() => {
    getStaffSelectOptions();
  });

  const SHIFT_OPTIONS = ['1', '2'].map((shift) => ({
    value: shift,
    label: shift,
  }));

  useEffect(() => {
    if (!open) {
      reset(initialValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <MyDialog
      fullWidth
      loading={loading}
      open={open}
      title={title}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <MySelect
                fullWidth
                autoFocus
                SelectProps={{
                  MenuProps: {
                    PaperProps: {
                      style: {
                        maxHeight: '200px',
                      },
                    },
                  },
                }}
                options={selectStaffOptions}
                name="staff_id"
                label="Nh??n vi??n"
                control={control}
                rules={{
                  required: 'Vui l??ng ch???n nh??n vi??n',
                }}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6}>
              <AreaSelect
                fullWidth
                name="area_id"
                label="Khu v???c"
                control={control}
                variant="outlined"
                rules={{
                  required: 'Vui l??ng ch???n khu v???c',
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <MyInput
                fullWidth
                type="date"
                name="date"
                label="Ng??y th???c hi???n"
                InputLabelProps={{
                  shrink: true,
                }}
                control={control}
                rules={{
                  required: 'Vui l??ng ch???n ng??y th???c hi???n',
                  validate: (value) => {
                    if (
                      dayjs().format(FIELD_DATE_FORMAT) !== value &&
                      dayjs(value).isBefore(dayjs())
                    ) {
                      return 'Vui l??ng ch???n ng??y th???c hi???n b???t ?????u t??? h??m nay';
                    }
                  },
                }}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6}>
              <MySelect
                fullWidth
                name="shift"
                label="Ca l??m"
                control={control}
                variant="outlined"
                rules={{
                  required: 'Vui l??ng ch???n ca l??m',
                }}
                options={SHIFT_OPTIONS}
              />
            </Grid>
            <Grid item xs={12}>
              <MyInput
                fullWidth
                multiline
                rows={3}
                name="description"
                label="M?? t??? c??ng vi???c"
                control={control}
                rules={{
                  required: 'Vui l??ng nh???p m?? t??? c??ng vi???c',
                }}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Grid container justify="flex-end" spacing={2}>
            <Grid item>
              <Button type="submit" color="primary" variant="outlined">
                ?????ng ??
              </Button>
            </Grid>
            <Grid item>
              <Button onClick={onClose} color="secondary" variant="outlined">
                H???y b???
              </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </form>
    </MyDialog>
  );
};

export default ShiftDialogForm;

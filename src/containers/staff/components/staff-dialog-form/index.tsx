import React, { useEffect } from 'react';
import { Button, DialogActions, DialogContent, Grid } from '@material-ui/core';
import { useForm, SubmitHandler, DefaultValues } from 'react-hook-form';

import MyDialog from 'components/common/my-dialog';
import MyInput from 'components/common/my-input';
import MySelect from 'components/common/my-select';
import { StaffFormValues } from 'types/staff';
import useEffectOnce from 'hooks/useEffectOnce';
import useShallowEqualSelector from 'hooks/useShallowEqualSelector';
import useActions from 'hooks/useActions';
import { selectPositionState } from 'selectors/position';
import * as actionCreators from 'redux/position/actionCreators';
import Spin from 'ui/spin';
import AccountInput, { SimpleAccount } from 'components/common/account-input';
import NumberInput from 'components/common/number-input';

interface StaffDialogFormProps {
  title: string;
  initialValues: DefaultValues<StaffFormValues>;
  open: boolean;
  loading: boolean;
  onSubmit: SubmitHandler<StaffFormValues>;
  onClose: React.MouseEventHandler;
}

const StaffDialogForm: React.FC<StaffDialogFormProps> = ({
  initialValues,
  loading,
  open,
  title,
  onSubmit,
  onClose,
}) => {
  const { handleSubmit, control, reset, setValue } = useForm<StaffFormValues>({
    defaultValues: initialValues,
  });

  const [getPositions] = useActions(actionCreators.getPositions);
  const { loading: loadingPositions, positions } =
    useShallowEqualSelector(selectPositionState);

  const { account_id, account_name } = initialValues;

  const defaultSelectedOption: SimpleAccount | undefined =
    account_id && account_name
      ? {
          id: account_id,
          username: account_name,
        }
      : undefined;
  const defaultAccounts: SimpleAccount[] = defaultSelectedOption
    ? [defaultSelectedOption]
    : [];

  const selectPositionOptions = positions.map(({ id, name }) => ({
    label: name,
    value: id,
  }));

  const STATUS = ['Đang làm việc', 'Đã nghỉ'];
  const STATUS_OPTIONS = STATUS.map((status) => ({
    label: status,
    value: status,
  }));

  useEffectOnce(() => {
    getPositions();
  });

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
          <Spin loading={loading}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <MyInput
                  fullWidth
                  autoFocus
                  name="name"
                  label="Tên nhân viên"
                  control={control}
                  rules={{
                    required: 'Vui lòng nhập họ tên',
                  }}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6}>
                <MyInput
                  fullWidth
                  name="email"
                  label="Email"
                  control={control}
                  rules={{
                    required: 'Vui lòng nhập email',
                    pattern: {
                      value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
                      message: 'Email không đúng',
                    },
                  }}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6}>
                <MyInput
                  fullWidth
                  name="phone"
                  label="Số điện thoại"
                  control={control}
                  rules={{
                    required: 'Vui lòng nhập số điện thoại',
                    pattern: {
                      value:
                        /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/,
                      message: 'Số điện thoại không đúng',
                    },
                  }}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6}>
                {!loadingPositions && (
                  <MySelect
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
                    name="position_id"
                    label="Vị trí làm việc"
                    control={control}
                    variant="outlined"
                    rules={{
                      required: 'Vui lòng chọn bộ phận',
                    }}
                    options={selectPositionOptions}
                  />
                )}
              </Grid>
              <Grid item xs={6}>
                <NumberInput
                  fullWidth
                  name="salary"
                  label="Mức lương"
                  control={control}
                  rules={{
                    required: 'Vui lòng nhập mức lương',
                  }}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6}>
                <AccountInput
                  name="account_id"
                  control={control}
                  setValue={setValue}
                  type="internal"
                  defaultAccounts={defaultAccounts}
                  defaultSelectedOption={defaultSelectedOption}
                />
              </Grid>
              <Grid item xs={6}>
                <MySelect
                  fullWidth
                  name="status"
                  label="Trạng thái"
                  control={control}
                  variant="outlined"
                  rules={{
                    required: 'Vui lòng chọn trạng thái',
                  }}
                  options={STATUS_OPTIONS}
                />
              </Grid>
            </Grid>
          </Spin>
        </DialogContent>
        <DialogActions>
          <Grid container justify="flex-end" spacing={2}>
            <Grid item>
              <Button type="submit" color="primary" variant="outlined">
                Đồng ý
              </Button>
            </Grid>
            <Grid item>
              <Button onClick={onClose} color="secondary" variant="outlined">
                Hủy bỏ
              </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </form>
    </MyDialog>
  );
};

export default StaffDialogForm;

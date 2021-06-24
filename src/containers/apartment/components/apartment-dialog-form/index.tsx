import React, { useEffect } from 'react';
import { Button, DialogActions, DialogContent, Grid } from '@material-ui/core';
import { useForm, SubmitHandler, DefaultValues } from 'react-hook-form';

import MyDialog from 'components/common/my-dialog';
import MyInput from 'components/common/my-input';
import MySelect from 'components/common/my-select';
import AccountInput from 'components/common/account-input';
import { ApartmentFormValues } from 'types/apartment';
import { SimpleAccount } from '../../../../components/common/account-input/index';

interface ApartmentDialogFormProps {
  title: string;
  initialValues: DefaultValues<ApartmentFormValues>;
  open: boolean;
  loading: boolean;
  onSubmit: SubmitHandler<ApartmentFormValues>;
  onClose: React.MouseEventHandler;
}

const APARTMENT_TYPES = ['Nhà ở thường', 'ShopHouse'];
const APARTMENT_TYPES_OPTIONS = APARTMENT_TYPES.map((type) => ({
  value: type,
  label: type,
}));

const ApartmentDialogForm: React.FC<ApartmentDialogFormProps> = ({
  initialValues,
  loading,
  open,
  title,
  onSubmit,
  onClose,
}) => {
  const { handleSubmit, control, reset, setValue } =
    useForm<ApartmentFormValues>({
      defaultValues: initialValues,
    });

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
              <MyInput
                fullWidth
                autoFocus
                name="apartment_number"
                label="Số căn hộ"
                control={control}
                rules={{
                  required: 'Vui lòng nhập số căn hộ',
                }}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6}>
              <MyInput
                fullWidth
                name="block_number"
                label="Block"
                control={control}
                rules={{
                  required: 'Vui lòng nhập Block',
                }}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6}>
              <MySelect
                fullWidth
                name="type"
                label="Loại"
                control={control}
                variant="outlined"
                options={APARTMENT_TYPES_OPTIONS}
                rules={{
                  required: 'Vui lòng nhập loại',
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <MyInput
                fullWidth
                name="floor_area"
                label="Diện tích"
                control={control}
                type="number"
                rules={{
                  required: 'Vui lòng nhập Diện tích',
                  validate: (value) => {
                    if (Number(value || 0) < 1) {
                      return 'Vui lòng nhập diện tích lớn hơn không';
                    }
                  },
                }}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6}>
              <MyInput
                fullWidth
                name="host"
                label="Họ tên chủ căn hộ"
                control={control}
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
              <MyInput
                fullWidth
                name="email"
                label="Email"
                control={control}
                rules={{
                  pattern: {
                    value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
                    message: 'Email không đúng',
                  },
                }}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6}>
              <AccountInput
                name="account_id"
                type="external"
                control={control}
                setValue={setValue}
                defaultAccounts={defaultAccounts}
                defaultSelectedOption={defaultSelectedOption}
              />
            </Grid>
            <Grid item xs={12}>
              <MyInput
                fullWidth
                multiline
                name="note"
                label="Ghi chú"
                control={control}
                variant="outlined"
                rows={2}
              />
            </Grid>
          </Grid>
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

export default ApartmentDialogForm;

import React, { useEffect } from 'react';
import {
  Button,
  DialogActions,
  DialogContent,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';
import { useForm, SubmitHandler } from 'react-hook-form';

import MyDialog from 'components/common/my-dialog';
import { GenerateReceiptParams, GenerateReceiptResponse } from 'types/receipt';
import ApartmentInput from 'components/common/apartment-input';
import MySelect from 'components/common/my-select';
import dayjs from 'dayjs';
import Spin from 'ui/spin';
import { formatCurrency } from 'utils/common';

interface ReceiptDialogFormProps {
  title: string;
  initialValues: GenerateReceiptParams;
  receiptData?: GenerateReceiptResponse;
  open: boolean;
  loading: boolean;
  onSubmit: SubmitHandler<GenerateReceiptParams>;
  onClose: React.MouseEventHandler;
}

const CURRENT_YEAR = dayjs().year();
const YEARS = [CURRENT_YEAR - 1, CURRENT_YEAR];
const YEAR_OPTIONS = YEARS.map((year) => ({ label: year, value: year }));

const MONTH_OPTIONS = Array(12)
  .fill('')
  .map((_, month) => ({
    label: month + 1,
    value: month + 1,
  }));

const ReceiptGenerateDialogForm: React.FC<ReceiptDialogFormProps> = ({
  initialValues,
  receiptData,
  loading,
  open,
  title,
  onSubmit,
  onClose,
}) => {
  const { handleSubmit, control, reset, setValue } = useForm({
    defaultValues: initialValues,
  });

  useEffect(() => {
    if (!open) {
      reset(initialValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  if (!open) return null;

  return (
    <MyDialog
      fullWidth
      maxWidth="md"
      loading={loading}
      open={open}
      title={title}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <ApartmentInput
                name="apartment_id"
                control={control}
                setValue={setValue}
                rules={{
                  required: 'Vui lòng chọn căn hộ',
                }}
              />
            </Grid>
            <Grid item xs={6} />
            <Grid item xs={6}>
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
                name="month"
                label="Tháng"
                control={control}
                variant="outlined"
                rules={{
                  required: 'Vui lòng chọn tháng',
                }}
                options={MONTH_OPTIONS}
              />
            </Grid>
            <Grid item xs={6}>
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
                name="year"
                label="Năm"
                control={control}
                variant="outlined"
                rules={{
                  required: 'Vui lòng chọn năm',
                }}
                options={YEAR_OPTIONS}
              />
            </Grid>
            <Grid item xs={12}>
              <Spin loading={loading}>
                {receiptData?.details && (
                  <TableContainer component={Paper}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell variant="head">STT</TableCell>
                          <TableCell variant="head">Diễn giải</TableCell>
                          <TableCell variant="head">Số lượng</TableCell>
                          <TableCell variant="head">Giá</TableCell>
                          <TableCell variant="head" align="right">
                            Thành tiền
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {receiptData?.details.map(
                          ({ fee_name, factor, price }, index) => (
                            <TableRow key={index}>
                              <TableCell variant="body">{index + 1}</TableCell>
                              <TableCell variant="body">{fee_name}</TableCell>
                              <TableCell variant="body">{factor}</TableCell>
                              <TableCell variant="body">
                                {formatCurrency(price)}
                              </TableCell>
                              <TableCell variant="body" align="right">
                                {formatCurrency(factor * price)}
                              </TableCell>
                            </TableRow>
                          ),
                        )}
                        <TableRow>
                          <TableCell colSpan={5} align="right">
                            <Typography variant="body1">
                              Tổng tiền:{' '}
                              {formatCurrency(receiptData.receipt.total)}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </Spin>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Grid container justify="flex-end" spacing={2}>
            <Grid item>
              <Button
                fullWidth
                type="submit"
                color="primary"
                variant="outlined"
              >
                Đồng ý
              </Button>
            </Grid>
            <Grid item>
              <Button
                fullWidth
                onClick={onClose}
                color="secondary"
                variant="outlined"
              >
                Hủy bỏ
              </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </form>
    </MyDialog>
  );
};

export default ReceiptGenerateDialogForm;

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
  const {
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { isSubmitted },
  } = useForm({
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
                  required: 'Vui l??ng ch???n c??n h???',
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
                label="Th??ng"
                control={control}
                variant="outlined"
                rules={{
                  required: 'Vui l??ng ch???n th??ng',
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
                label="N??m"
                control={control}
                variant="outlined"
                rules={{
                  required: 'Vui l??ng ch???n n??m',
                }}
                options={YEAR_OPTIONS}
              />
            </Grid>
            <Grid item xs={12}>
              <Spin loading={loading}>
                {isSubmitted && receiptData?.details && (
                  <TableContainer component={Paper}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell variant="head">STT</TableCell>
                          <TableCell variant="head">Di???n gi???i</TableCell>
                          <TableCell variant="head">S??? l?????ng</TableCell>
                          <TableCell variant="head">Gi??</TableCell>
                          <TableCell variant="head" align="right">
                            Th??nh ti???n
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
                              T???ng ti???n:{' '}
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
          {!isSubmitted && (
            <Grid container justify="flex-end" spacing={2}>
              <Grid item>
                <Button
                  fullWidth
                  type="submit"
                  color="primary"
                  variant="outlined"
                >
                  ?????ng ??
                </Button>
              </Grid>
              <Grid item>
                <Button
                  fullWidth
                  onClick={onClose}
                  color="secondary"
                  variant="outlined"
                >
                  H???y b???
                </Button>
              </Grid>
            </Grid>
          )}

          {isSubmitted && (
            <Grid container justify="flex-end" spacing={2}>
              <Grid item>
                <Button
                  fullWidth
                  onClick={onClose}
                  color="secondary"
                  variant="outlined"
                >
                  ????ng
                </Button>
              </Grid>
            </Grid>
          )}
        </DialogActions>
      </form>
    </MyDialog>
  );
};

export default ReceiptGenerateDialogForm;

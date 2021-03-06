import React, { useEffect } from 'react';
import {
  Button,
  DialogActions,
  DialogContent,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  Tooltip,
  Typography,
  Paper,
  TableContainer,
} from '@material-ui/core';
import {
  useForm,
  SubmitHandler,
  useFieldArray,
  DefaultValues,
} from 'react-hook-form';

import MyDialog from 'components/common/my-dialog';
import MyInput from 'components/common/my-input';
import { ReceiptFormValues } from 'types/receipt';
import ApartmentInput from 'components/common/apartment-input';
import { Delete, Add } from '@material-ui/icons';
import { formatCurrency } from 'utils/common';
import NumberInput from 'components/common/number-input';

interface ReceiptDialogFormManualProps {
  title: string;
  initialValues: DefaultValues<ReceiptFormValues>;
  open: boolean;
  loading: boolean;
  onSubmit: SubmitHandler<ReceiptFormValues>;
  onClose: React.MouseEventHandler;
}

const ReceiptDialogFormManual: React.FC<ReceiptDialogFormManualProps> = ({
  initialValues,
  loading,
  open,
  title,
  onSubmit,
  onClose,
}) => {
  const { handleSubmit, control, reset, watch, setValue } =
    useForm<ReceiptFormValues>({
      defaultValues: initialValues,
    });

  const {
    fields: fieldRows,
    append,
    remove,
  } = useFieldArray({
    name: 'details',
    control,
    shouldUnregister: true,
  });

  const details = watch('details', []);

  const controlledFieldRows = fieldRows.map((fieldRow, index) => {
    return {
      ...fieldRow,
      ...details[index],
    };
  });

  const totalAmount = details.reduce((sum, { factor, price }) => {
    if (factor && price) {
      return sum + Number(factor) * Number(price);
    }

    return sum;
  }, 0);

  const addRow = () => {
    append({
      fee_name: '',
      factor: 0,
      price: 0,
    });
  };

  const removeRow = (index: number) => () => remove(index);

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
          <Grid container direction="column" spacing={2}>
            <Grid item container spacing={2}>
              <Grid item xs={4}>
                <ApartmentInput
                  name="receipt.apartment_id"
                  control={control}
                  setValue={setValue}
                  rules={{
                    required: 'Vui l??ng nh???p c??n h???',
                  }}
                />
              </Grid>
              <Grid item xs={8}>
                <MyInput
                  fullWidth
                  name="receipt.content"
                  label="N???i dung thu"
                  control={control}
                  rules={{
                    required: 'Vui l??ng nh???p n???i dung thu',
                  }}
                  variant="outlined"
                />
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1">Chi ti???t phi???u thu</Typography>
            </Grid>
            <Grid item>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell variant="head">STT</TableCell>
                      <TableCell variant="head" colSpan={2}>
                        Di???n gi???i
                      </TableCell>
                      <TableCell variant="head">S??? l?????ng</TableCell>
                      <TableCell variant="head">Gi?? ti???n</TableCell>
                      <TableCell variant="head">Th??nh ti???n</TableCell>
                      <TableCell variant="head"></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {controlledFieldRows.map((fieldRow, index) => {
                      const { factor = 0, price = 0 } = details[index] ?? {};
                      const subTotal = Number(factor) * Number(price) || 0;
                      return (
                        <TableRow key={fieldRow.id}>
                          <TableCell variant="body">{index + 1}</TableCell>
                          <TableCell variant="body" colSpan={2}>
                            <MyInput
                              key={`${fieldRow.id}.details.${index}.fee_name`}
                              name={`details.${index}.fee_name` as const}
                              control={control}
                              rules={{
                                required: 'Vui l??ng nh???p t??n kho???n thu',
                              }}
                              variant="standard"
                              defaultValue={watch(
                                `details.${index}.fee_name` as const,
                              )}
                            />
                          </TableCell>
                          <TableCell variant="body">
                            <NumberInput
                              key={`${fieldRow.id}.details.${index}.factor`}
                              name={`details.${index}.factor` as const}
                              control={control}
                              rules={{
                                required: 'Vui l??ng nh???p h??? s???',
                                validate: (value) => {
                                  if (value <= 0) {
                                    return 'Vui l??ng nh???p h??? s??? l???n h??n kh??ng';
                                  }
                                },
                              }}
                              variant="standard"
                              defaultValue={watch(
                                `details.${index}.fee_name` as const,
                              )}
                            />
                          </TableCell>
                          <TableCell variant="body">
                            <NumberInput
                              key={`${fieldRow.id}.details.${index}.price`}
                              name={`details.${index}.price` as const}
                              control={control}
                              rules={{
                                required: 'Vui l??ng nh???p m???c gi?? ??p d???ng',
                                validate: (value) => {
                                  if (value < 1) {
                                    return 'Vui l??ng m???c gi?? l???n h??n kh??ng';
                                  }
                                },
                              }}
                              variant="standard"
                              defaultValue={watch(
                                `details.${index}.fee_name` as const,
                              )}
                            />
                          </TableCell>
                          <TableCell variant="body">
                            <Typography variant="body1">
                              {formatCurrency(subTotal)}
                            </Typography>
                          </TableCell>
                          <TableCell variant="body">
                            <Tooltip title="X??a chi ti???t">
                              <IconButton onClick={removeRow(index)}>
                                <Delete />
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                    <TableRow>
                      <TableCell colSpan={7} align="left">
                        <Tooltip title="Th??m chi ti???t">
                          <IconButton
                            onClick={addRow}
                            color="primary"
                            size="small"
                          >
                            <Add />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <TableCell colSpan={6} align="right">
                        <Typography variant="body1">T???ng ti???n :</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body1" align="left">
                          {formatCurrency(totalAmount)}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableFooter>
                </Table>
              </TableContainer>
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

export default ReceiptDialogFormManual;

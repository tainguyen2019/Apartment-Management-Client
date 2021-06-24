import React, { useContext } from 'react';
import dayjs from 'dayjs';
import {
  Button,
  DialogActions,
  DialogContent,
  Grid,
  Paper,
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableHead,
  TextField,
  TableBody,
  Typography,
} from '@material-ui/core';

import MyDialog from 'components/common/my-dialog';
import { DATE_FORMAT } from 'constants/common';
import useActions from 'hooks/useActions';
import useShallowEqualSelector from 'hooks/useShallowEqualSelector';
import * as actionCreators from 'redux/receipt-detail/actionCreators';
import { selectReceiptDetailState } from 'selectors/receiptDetail';

import ViewReceiptDialogContext from '../../contexts/ViewReceiptDialogContext';
import { formatCurrency } from 'utils/common';
import Spin from 'ui/spin';
import useDidUpdate from 'hooks/useDidUpdate';

const ViewDialogForm: React.FC = () => {
  const { open, receipt, onClose } = useContext(ViewReceiptDialogContext);
  const [getDetails] = useActions(actionCreators.getReceiptDetails);
  const { loading, receiptDetails } = useShallowEqualSelector(
    selectReceiptDetailState,
  );

  useDidUpdate(() => {
    if (open && receipt) {
      getDetails(receipt.id);
    }
  }, [open, receipt]);

  if (!receipt) return null;

  const { apartment_number, block_number, content, date, staff_name } = receipt;

  return (
    <MyDialog
      fullWidth
      maxWidth="md"
      open={open}
      title="Xem chi tiết phiếu thu"
      onClose={onClose}
    >
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Căn hộ"
              variant="outlined"
              defaultValue={`${block_number}-${apartment_number}`}
              inputProps={{
                readOnly: true,
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Ngày lập"
              variant="outlined"
              defaultValue={dayjs(date).format(DATE_FORMAT)}
              inputProps={{
                readOnly: true,
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Người lập"
              variant="outlined"
              defaultValue={staff_name}
              inputProps={{
                readOnly: true,
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Nội dung thu"
              variant="outlined"
              defaultValue={content}
              inputProps={{
                readOnly: true,
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Spin loading={loading}>
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
                    {receiptDetails.length > 0 &&
                      receiptDetails.map(
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
                          Tổng tiền: {formatCurrency(receipt.total)}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Spin>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Grid container justify="flex-end" spacing={2}>
          <Grid item>
            <Button onClick={onClose} color="secondary" variant="outlined">
              Đóng
            </Button>
          </Grid>
        </Grid>
      </DialogActions>
    </MyDialog>
  );
};

export default ViewDialogForm;

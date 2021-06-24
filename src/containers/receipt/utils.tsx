import dayjs from 'dayjs';
import { Grid } from '@material-ui/core';

import { ColumnOptionsList } from 'components/common/my-table';
import { DATE_FORMAT } from 'constants/common';
import { Receipt } from 'types/receipt';

import ViewButton from './components/view-button';
import ApproveButton from './components/approve-button';
import DeleteButton from './components/delete-button';
import { formatCurrency } from 'utils/common';
import Restriction from 'components/common/restriction';
import { PRIVILEGES } from 'constants/users';

export const createReceiptCols = (
  page: number,
  pageSize: number,
): ColumnOptionsList<Receipt> => [
  {
    name: 'STT',
    renderCellContent: (_, index) => (page - 1) * pageSize + (index + 1),
  },
  { key: 'apartment_number', name: 'Căn hộ' },
  { key: 'block_number', name: 'Block' },
  {
    key: 'date',
    name: 'Ngày lập',
    renderCellContent: (record) => dayjs(record.date).format(DATE_FORMAT),
  },
  {
    key: 'staff_name',
    name: 'Người lập',
  },
  { key: 'content', name: 'Nội dung thu' },
  {
    name: 'Tổng tiền',
    renderCellContent: (record) => formatCurrency(record.total),
  },
  { key: 'status', name: 'Trạng thái' },
  {
    name: 'Hành động',
    renderCellContent: (record) => (
      <Grid container>
        <Grid item>
          <Restriction privilege={PRIVILEGES.readReceipt.value}>
            <ViewButton receipt={record} />
          </Restriction>
        </Grid>
        <Grid item>
          <Restriction privilege={PRIVILEGES.approveReceipt.value}>
            <ApproveButton receipt={record} />
          </Restriction>
        </Grid>
        <Grid item>
          <Restriction privilege={PRIVILEGES.deleteReceipt.value}>
            <DeleteButton receipt={record} />
          </Restriction>
        </Grid>
      </Grid>
    ),
  },
];

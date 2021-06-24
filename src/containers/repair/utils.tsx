import { Grid } from '@material-ui/core';
import dayjs from 'dayjs';

import { ColumnOptionsList } from 'components/common/my-table';
import { DATE_FORMAT } from 'constants/common';
import { Repair } from 'types/repair';

import EditButton from './components/edit-button';
import AssignmentButton from './components/assignment-button';
import CompleteButton from './components/complete-button';
import RateButton from './components/rate-button';
import { PRIVILEGES } from 'constants/users';
import Restriction from 'components/common/restriction';

export const createRepairCols = (
  page: number,
  pageSize: number,
): ColumnOptionsList<Repair> => [
  {
    name: 'STT',
    renderCellContent: (_, index) => (page - 1) * pageSize + (index + 1),
  },
  { key: 'apartment_number', name: 'Căn hộ' },
  { key: 'block_number', name: 'Block' },
  {
    key: 'date',
    name: 'Ngày dự kiến',
    renderCellContent: (record) => dayjs(record.date).format(DATE_FORMAT),
  },
  { key: 'content', name: 'Nội dung sửa chữa' },
  { key: 'rate', name: 'Đánh giá' },
  { key: 'staff_name', name: 'Người phụ trách' },
  { key: 'status', name: 'Trạng thái' },
  {
    name: 'Hành động',
    renderCellContent: (record) => (
      <Grid container>
        <Restriction privilege={PRIVILEGES.writeRepair.value}>
          <EditButton repair={record} />
        </Restriction>
        <Restriction privilege={PRIVILEGES.approveRepair.value}>
          <AssignmentButton repair={record} />
        </Restriction>
        <Restriction privilege={PRIVILEGES.writeRepair.value}>
          <CompleteButton repair={record} />
        </Restriction>
        <Restriction privilege={PRIVILEGES.writeRepair.value}>
          <RateButton repair={record} />
        </Restriction>
      </Grid>
    ),
  },
];

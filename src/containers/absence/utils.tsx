import dayjs from 'dayjs';
import { Grid } from '@material-ui/core';

import { DATE_FORMAT } from 'constants/common';
import { Absence } from 'types/absence';

import { ColumnOptionsList } from 'components/common/my-table';
import ApproveButton from './components/approve-button';
import EditButton from './components/edit-button';
import Restriction from 'components/common/restriction';
import { PRIVILEGES } from 'constants/users';

export const createAbsenceCols = (
  page: number,
  pageSize: number,
): ColumnOptionsList<Absence> => [
  {
    name: 'STT',
    renderCellContent: (_, index) => (page - 1) * pageSize + (index + 1),
  },
  {
    key: 'date',
    name: 'Ngày nghỉ',
    renderCellContent: ({ date }) => dayjs(date).format(DATE_FORMAT),
  },
  { key: 'staff_name', name: 'Họ tên' },
  { key: 'department_name', name: 'Bộ phận' },
  { key: 'reason', name: 'Lý do' },
  { key: 'approver_name', name: 'Người phê duyệt' },
  { key: 'status', name: 'Trạng thái' },
  {
    name: 'Hành động',
    renderCellContent: (record) => (
      <Grid container>
        <Restriction privilege={PRIVILEGES.approveAbsence.value}>
          <ApproveButton absence={record} />
        </Restriction>
        <Restriction privilege={PRIVILEGES.writeAbsence.value}>
          <EditButton absence={record} />
        </Restriction>
      </Grid>
    ),
  },
];

import { Grid } from '@material-ui/core';
import dayjs from 'dayjs';

import { ColumnOptionsList } from 'components/common/my-table';
import { DATE_FORMAT } from 'constants/common';
import { Event } from 'types/event';
import ApproveButton from './components/approve-button';
import EditButton from './components/edit-button';
import CancelButton from 'containers/event/components/cancel-button';
import Restriction from 'components/common/restriction';
import { PRIVILEGES } from 'constants/users';

export const createEventCols = (
  page: number,
  pageSize: number,
): ColumnOptionsList<Event> => [
  {
    name: 'STT',
    renderCellContent: (_, index) => (page - 1) * pageSize + (index + 1),
  },
  { key: 'apartment_number', name: 'Căn hộ' },
  { key: 'block_number', name: 'Block' },
  { key: 'name', name: 'Tên sự kiện' },
  {
    key: 'date',
    name: 'Ngày tổ chức',
    renderCellContent: (record) => dayjs(record.date).format(DATE_FORMAT),
  },
  { key: 'start_time', name: 'Bắt đầu' },
  { key: 'end_time', name: 'Kết thúc' },
  { key: 'staff_name', name: 'Người phê duyệt' },
  { key: 'status', name: 'Trạng thái' },
  { key: 'note', name: 'Ghi chú' },
  {
    name: 'Hành động',
    renderCellContent: (record) => (
      <Grid container>
        <Restriction privilege={PRIVILEGES.writeEvent.value}>
          <EditButton event={record} />
        </Restriction>
        <Restriction privilege={PRIVILEGES.approveEvent.value}>
          <ApproveButton event={record} />
        </Restriction>
        <Restriction privilege={PRIVILEGES.approveEvent.value}>
          <CancelButton event={record} />
        </Restriction>
      </Grid>
    ),
  },
];

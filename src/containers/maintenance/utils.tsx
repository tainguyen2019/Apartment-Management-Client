import { Grid } from '@material-ui/core';
import dayjs from 'dayjs';

import { ColumnOptionsList } from 'components/common/my-table';
import { DATE_FORMAT } from 'constants/common';
import { Maintenance } from 'types/maintenance';
import EditButton from './components/edit-button';
import { PRIVILEGES } from 'constants/users';
import Restriction from 'components/common/restriction';

export const createMaintenanceCols = (
  page: number,
  pageSize: number,
): ColumnOptionsList<Maintenance> => [
  {
    name: 'STT',
    renderCellContent: (_, index) => (page - 1) * pageSize + (index + 1),
  },
  { key: 'device_name', name: 'Thiết bị' },
  { key: 'building', name: 'Tòa nhà' },
  { key: 'location', name: 'Vị trí' },
  {
    key: 'date',
    name: 'Ngày bảo trì',
    renderCellContent: (record) => dayjs(record.date).format(DATE_FORMAT),
  },
  { key: 'staff_name', name: 'Người phụ trách' },
  {
    name: 'Hành động',
    renderCellContent: (record) => (
      <Grid container>
        <Restriction privilege={PRIVILEGES.writeMaintenance.value}>
          <EditButton maintenance={record} />
        </Restriction>
      </Grid>
    ),
  },
];

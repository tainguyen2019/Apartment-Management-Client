import { Grid } from '@material-ui/core';

import { ColumnOptionsList } from 'components/common/my-table';
import Restriction from 'components/common/restriction';
import { PRIVILEGES } from 'constants/users';
import { Arrange } from 'types/arrange';
import EditButton from './components/edit-button';

export const createArrangeCols = (
  page: number,
  pageSize: number,
): ColumnOptionsList<Arrange> => [
  {
    name: 'STT',
    renderCellContent: (_, index) => (page - 1) * pageSize + (index + 1),
  },
  { key: 'device_name', name: 'Thiết bị' },
  { key: 'building', name: 'Tòa nhà' },
  { key: 'location', name: 'Vị trí' },
  { key: 'quantity', name: 'Số lượng' },
  {
    name: 'Hành động',
    renderCellContent: (record) => (
      <Grid container>
        <Restriction privilege={PRIVILEGES.writeDeviceArrange.value}>
          <EditButton arrange={record} />
        </Restriction>
      </Grid>
    ),
  },
];

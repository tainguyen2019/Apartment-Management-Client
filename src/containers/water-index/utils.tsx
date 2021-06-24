import dayjs from 'dayjs';
import { Grid } from '@material-ui/core';
import { ColumnOptionsList } from 'components/common/my-table';
import { DATE_FORMAT } from 'constants/common';
import { WaterIndex } from 'types/water-index';

import ConfirmButton from './components/confirm-button';
import EditButton from './components/edit-button';
import { PRIVILEGES } from 'constants/users';
import Restriction from 'components/common/restriction';

export const createWaterIndexCols = (
  page: number,
  pageSize: number,
): ColumnOptionsList<WaterIndex> => [
  {
    name: 'STT',
    renderCellContent: (_, index) => (page - 1) * pageSize + (index + 1),
  },
  {
    key: 'date',
    name: 'Ngày',
    renderCellContent: (record) => dayjs(record.date).format(DATE_FORMAT),
  },
  { key: 'block_number', name: 'Block' },
  { key: 'apartment_number', name: 'Căn hộ số' },
  { key: 'start_index', name: 'Chỉ số cũ (m3)' },
  { key: 'end_index', name: 'Chỉ số mới (m3)' },
  { key: 'usage_amount', name: 'Tiêu thụ (m3)' },
  { key: 'status', name: 'Trạng thái' },
  {
    name: 'Hành động',
    renderCellContent: (record) => (
      <Grid container>
        <Grid item>
          <Restriction privilege={PRIVILEGES.writeWaterIndex.value}>
            <EditButton waterIndex={record} />
          </Restriction>
        </Grid>
        <Grid item>
          <Restriction privilege={PRIVILEGES.approveWaterIndex.value}>
            <ConfirmButton waterIndex={record} />
          </Restriction>
        </Grid>
      </Grid>
    ),
  },
];

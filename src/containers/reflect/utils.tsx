import { Grid } from '@material-ui/core';
import dayjs from 'dayjs';

import { ColumnOptionsList } from 'components/common/my-table';

import { DATE_FORMAT } from 'constants/common';
import { Reflect } from 'types/reflect';

import EditButton from './components/edit-button';
import AnswerButton from './components/answer-button';
import ViewButton from './components/view-button';
import Restriction from 'components/common/restriction';
import { PRIVILEGES } from 'constants/users';

export const createReflectCols = (
  page: number,
  pageSize: number,
): ColumnOptionsList<Reflect> => [
  {
    name: 'STT',
    renderCellContent: (_, index) => (page - 1) * pageSize + (index + 1),
  },
  {
    name: 'Ngày gửi',
    renderCellContent: (record) => dayjs(record.date).format(DATE_FORMAT),
  },
  { key: 'apartment_number', name: 'Căn hộ' },
  { key: 'block_number', name: 'Block' },
  { key: 'title', name: 'Tiêu đề' },
  { key: 'department_name', name: 'Bộ phận tiếp nhận' },
  { key: 'status', name: 'Trạng thái' },
  {
    name: 'Hành động',
    renderCellContent: (record) => (
      <Grid container>
        <Restriction privilege={PRIVILEGES.readReflect.value}>
          <ViewButton reflect={record} />
        </Restriction>
        <Restriction privilege={PRIVILEGES.approveReflect.value}>
          <AnswerButton reflect={record} />
        </Restriction>
        <Restriction privilege={PRIVILEGES.writeReflect.value}>
          <EditButton reflect={record} />
        </Restriction>
      </Grid>
    ),
  },
];

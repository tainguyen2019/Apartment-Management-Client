import dayjs from 'dayjs';
import { Grid } from '@material-ui/core';

import { ColumnOptionsList } from 'components/common/my-table';
import Restriction from 'components/common/restriction';
import { DATE_TIME_FORMAT } from 'constants/common';
import { Account } from 'types/account';

import EditButton from './components/edit-button';
import { PRIVILEGES } from 'constants/users';

export const createAccountCols = (
  page: number,
  pageSize: number,
): ColumnOptionsList<Account> => [
  {
    name: 'STT',
    renderCellContent: (_, index) => (page - 1) * pageSize + (index + 1),
  },
  { key: 'username', name: 'Tên tài khoản' },
  { key: 'role_name', name: 'Role' },
  { key: 'type', name: 'Loại' },
  {
    key: 'created_at',
    name: 'Ngày tạo',
    renderCellContent: ({ created_at }) =>
      dayjs(created_at).format(DATE_TIME_FORMAT),
  },
  {
    key: 'updated_at',
    name: 'Ngày cập nhật',
    renderCellContent: ({ updated_at }) =>
      dayjs(updated_at).format(DATE_TIME_FORMAT),
  },
  {
    name: 'Hành động',
    renderCellContent: (record) => (
      <Grid container>
        <Restriction privilege={PRIVILEGES.writeAccount.value}>
          <EditButton account={record} />
        </Restriction>
      </Grid>
    ),
  },
];

import { IconButton, Tooltip } from '@material-ui/core';
import { Edit as EditIcon } from '@material-ui/icons';
import dayjs from 'dayjs';

import { ColumnOptionsList } from 'components/common/my-table';
import { DATE_FORMAT } from 'constants/common';
import { RecordEditor } from 'types/common';
import { Payslip } from 'types/payslip';
import { formatCurrency } from 'utils/common';
import Restriction from 'components/common/restriction';
import { PRIVILEGES } from 'constants/users';

export const createPayslipCols = (
  onEdit: RecordEditor<Payslip>,
  page: number,
  pageSize: number,
): ColumnOptionsList<Payslip> => [
  {
    name: 'STT',
    renderCellContent: (_, index) => (page - 1) * pageSize + (index + 1),
  },
  {
    key: 'date',
    name: 'Ngày lập',
    renderCellContent: (record) => dayjs(record.date).format(DATE_FORMAT),
  },
  { key: 'staff_name', name: 'Người lập' },
  { key: 'content', name: 'Nội dung chi' },
  {
    name: 'Số tiền',
    renderCellContent: (record) => formatCurrency(record.total),
  },

  {
    name: 'Hành động',
    renderCellContent: (record) => (
      <Restriction privilege={PRIVILEGES.writePayslip.value}>
        <Tooltip title="Chỉnh sửa" key={record.id}>
          <IconButton onClick={onEdit(record)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
      </Restriction>
    ),
  },
];

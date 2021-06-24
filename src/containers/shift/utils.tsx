import { IconButton, Tooltip } from '@material-ui/core';
import { Edit as EditIcon } from '@material-ui/icons';
import { ColumnOptionsList } from 'components/common/my-table';
import Restriction from 'components/common/restriction';
import { DATE_FORMAT } from 'constants/common';
import { PRIVILEGES } from 'constants/users';
import dayjs from 'dayjs';
import { RecordEditor } from 'types/common';
import { Shift } from 'types/shift';

export const createShiftCols = (
  onEdit: RecordEditor<Shift>,
  page: number,
  pageSize: number,
): ColumnOptionsList<Shift> => [
  {
    name: 'STT',
    renderCellContent: (_, index) => (page - 1) * pageSize + (index + 1),
  },
  { key: 'staff_name', name: 'Tên nhân viên' },
  { key: 'department_name', name: 'Bộ phận' },
  { key: 'building', name: 'Tòa nhà' },
  { key: 'location', name: 'Vị trí' },
  {
    key: 'date',
    name: 'Ngày thực hiện',
    renderCellContent: (record) => dayjs(record.date).format(DATE_FORMAT),
  },
  { key: 'description', name: 'Công việc' },
  { key: 'shift', name: 'Ca làm' },
  {
    name: 'Hành động',
    renderCellContent: (record) => (
      <Restriction privilege={PRIVILEGES.writeShift.value}>
        <Tooltip title="Chỉnh sửa" key={record.id}>
          <IconButton onClick={onEdit(record)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
      </Restriction>
    ),
  },
];

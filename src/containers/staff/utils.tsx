import { IconButton, Tooltip } from '@material-ui/core';
import { Edit as EditIcon } from '@material-ui/icons';
import { ColumnOptionsList } from 'components/common/my-table';
import Restriction from 'components/common/restriction';
import { PRIVILEGES } from 'constants/users';
import { RecordEditor } from 'types/common';
import { Staff } from 'types/staff';

export const createStaffCols = (
  onEdit: RecordEditor<Staff>,
  page: number,
  pageSize: number,
): ColumnOptionsList<Staff> => [
  {
    name: 'STT',
    renderCellContent: (_, index) => (page - 1) * pageSize + (index + 1),
  },
  { key: 'name', name: 'Họ tên' },
  { key: 'phone', name: 'SDT' },
  { key: 'email', name: 'Email' },
  { key: 'position_name', name: 'Chức vụ' },
  { key: 'department_name', name: 'Phòng ban' },
  { key: 'status', name: 'Trạng thái' },
  {
    name: 'Hành động',
    renderCellContent: (record) => (
      <Restriction privilege={PRIVILEGES.writeStaff.value}>
        <Tooltip title="Chỉnh sửa" key={record.id}>
          <IconButton onClick={onEdit(record)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
      </Restriction>
    ),
  },
];

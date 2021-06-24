import { IconButton, Tooltip } from '@material-ui/core';
import { Edit as EditIcon } from '@material-ui/icons';
import { ColumnOptionsList } from 'components/common/my-table';
import { RecordEditor } from 'types/common';
import { Apartment } from 'types/apartment';
import { PRIVILEGES } from 'constants/users';
import Restriction from 'components/common/restriction';

export const createApartmentCols = (
  onEdit: RecordEditor<Apartment>,
  page: number,
  pageSize: number,
): ColumnOptionsList<Apartment> => [
  {
    name: 'STT',
    renderCellContent: (_, index) => (page - 1) * pageSize + (index + 1),
  },
  { key: 'apartment_number', name: 'Căn hộ số' },
  { key: 'block_number', name: 'Block' },
  { key: 'type', name: 'Loại' },
  { key: 'floor_area', name: 'Diện tích (m2)' },
  { key: 'host', name: 'Họ tên chủ hộ' },
  { key: 'phone', name: 'SDT' },
  { key: 'email', name: 'Email' },
  {
    name: 'Hành động',
    renderCellContent: (record) => (
      <Restriction privilege={PRIVILEGES.writeApartment.value}>
        <Tooltip title="Chỉnh sửa" key={record.id}>
          <IconButton onClick={onEdit(record)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
      </Restriction>
    ),
  },
];

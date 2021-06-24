import { Grid, IconButton, Tooltip } from '@material-ui/core';
import { Edit } from '@material-ui/icons';
import { ColumnOptionsList } from 'components/common/my-table';
import { Device } from 'types/device';
import { RecordEditor } from 'types/common';
import { PRIVILEGES } from 'constants/users';
import Restriction from 'components/common/restriction';

export const createDeviceCols = (
  onEdit: RecordEditor<Device>,
): ColumnOptionsList<Device> => [
  {
    name: 'STT',
    renderCellContent: (_, index) => index + 1,
  },
  { key: 'name', name: 'Tên thiết bị' },
  { key: 'description', name: 'Mô tả' },
  {
    name: 'Hành động',
    renderCellContent: (record) => (
      <Grid container spacing={1}>
        <Restriction privilege={PRIVILEGES.writeDevice.value}>
          <Tooltip title="Chỉnh sửa" key={record.id}>
            <IconButton onClick={onEdit(record)}>
              <Edit />
            </IconButton>
          </Tooltip>
        </Restriction>
      </Grid>
    ),
  },
];

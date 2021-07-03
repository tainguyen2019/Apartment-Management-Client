import { Grid, IconButton, Tooltip } from '@material-ui/core';
import { Edit } from '@material-ui/icons';

import { ColumnOptionsList } from 'components/common/my-table';
import { Area } from 'types/area';
import { RecordEditor } from 'types/common';
import { PRIVILEGES } from 'constants/users';
import Restriction from 'components/common/restriction';

export const createAreaCols = (
  onEdit: RecordEditor<Area>,
): ColumnOptionsList<Area> => [
  {
    name: 'STT',
    renderCellContent: (_, index) => index + 1,
  },
  { key: 'building', name: 'Tòa nhà' },

  { key: 'location', name: 'Vị trí/ Khu vực' },
  {
    name: 'Hành động',
    renderCellContent: (record) => (
      <Grid container spacing={1}>
        <Restriction privilege={PRIVILEGES.writeArea.value}>
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

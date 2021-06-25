import { Grid, IconButton, Tooltip } from '@material-ui/core';
import { Edit } from '@material-ui/icons';

import { ColumnOptionsList } from 'components/common/my-table';
import { Fee } from 'types/fee';
import { RecordEditor } from 'types/common';
import { formatCurrency } from 'utils/common';
import { PRIVILEGES } from 'constants/users';
import Restriction from 'components/common/restriction';
import storageService from 'services/storage';

export const createFeeCols = (
  onEdit: RecordEditor<Fee>,
): ColumnOptionsList<Fee> => {
  let columns: ColumnOptionsList<Fee> = [
    {
      name: 'STT',
      renderCellContent: (_, index) => index + 1,
    },
    { key: 'name', name: 'Tên phí' },
    {
      name: 'Mức giá',
      renderCellContent: (record) => formatCurrency(record.amount),
    },
    { key: 'unit', name: 'Đơn vị' },
  ];

  if (storageService.getItem<string>('staff_id')) {
    columns.push({
      name: 'Hành động',
      renderCellContent: (record) => (
        <Grid container spacing={1}>
          <Restriction privilege={PRIVILEGES.writeFee.value}>
            <Tooltip title="Chỉnh sửa" key={record.id}>
              <IconButton onClick={onEdit(record)}>
                <Edit />
              </IconButton>
            </Tooltip>
          </Restriction>
        </Grid>
      ),
    });
  }

  return columns;
};

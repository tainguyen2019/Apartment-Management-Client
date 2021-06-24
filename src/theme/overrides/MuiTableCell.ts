import { TableCellClassKey } from '@material-ui/core';
import { StyleRules } from '@material-ui/core';
import defaultTheme from 'theme/defaultTheme';

const MuiTableCell: Partial<StyleRules<TableCellClassKey>> = {
  head: {
    backgroundColor: defaultTheme.palette.primary.main,
    color: defaultTheme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
};

export default MuiTableCell;

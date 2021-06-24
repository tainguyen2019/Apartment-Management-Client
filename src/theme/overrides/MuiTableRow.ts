import { TableRowClassKey } from '@material-ui/core';
import { StyleRules } from '@material-ui/core';
import defaultTheme from 'theme/defaultTheme';

const MuiTableRow: Partial<StyleRules<TableRowClassKey>> = {
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: defaultTheme.palette.action.hover,
    },
  },
};

export default MuiTableRow;

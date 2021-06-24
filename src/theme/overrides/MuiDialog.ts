import { DialogClassKey } from '@material-ui/core';
import { StyleRules } from '@material-ui/core';
import defaultTheme from 'theme/defaultTheme';

const MuiDialog: Partial<StyleRules<DialogClassKey>> = {
  paper: {
    margin: defaultTheme.spacing(2),
  },
};

export default MuiDialog;

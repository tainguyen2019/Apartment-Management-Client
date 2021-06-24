import { DialogActionsClassKey } from '@material-ui/core';
import { StyleRules } from '@material-ui/core';
import defaultTheme from 'theme/defaultTheme';

const DialogActions: Partial<StyleRules<DialogActionsClassKey>> = {
  root: {
    padding: defaultTheme.spacing(2, 3),
  },
};

export default DialogActions;

import { DialogContentClassKey } from '@material-ui/core';
import { StyleRules } from '@material-ui/core';
import defaultTheme from 'theme/defaultTheme';

const DialogContent: Partial<StyleRules<DialogContentClassKey>> = {
  root: {
    padding: defaultTheme.spacing(2, 3),
  },
};

export default DialogContent;

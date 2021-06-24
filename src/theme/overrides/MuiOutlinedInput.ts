import { OutlinedInputClassKey } from '@material-ui/core';
import { StyleRules } from '@material-ui/core';
import defaultTheme from 'theme/defaultTheme';

const MuiOutlinedInput: Partial<StyleRules<OutlinedInputClassKey>> = {
  notchedOutline: {
    '& > legend': {
      paddingRight: defaultTheme.spacing(1),
    },
  },
};

export default MuiOutlinedInput;

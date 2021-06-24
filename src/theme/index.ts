import { createMuiTheme } from '@material-ui/core';
import defaultTheme from './defaultTheme';

import overrides from './overrides';

// Root theme
const theme = createMuiTheme({
  ...defaultTheme,
  overrides,
  zIndex: {
    appBar: 1200,
    drawer: 1100,
  },
});

export default theme;

import { createMuiTheme } from '@material-ui/core';
import palette from './palette';

// Default theme to reference in overrides styles
const defaultTheme = createMuiTheme({
  palette,
});

export default defaultTheme;

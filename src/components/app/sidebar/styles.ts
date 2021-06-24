import { makeStyles, Theme, createStyles } from '@material-ui/core';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.common.white,
    },
    homeLink: {
      lineHeight: 0,
      color: theme.palette.getContrastText(theme.palette.common.white),
    },
    menuItem: {
      color: theme.palette.common.black,
    },
  });

const useStyles = makeStyles(styles, { classNamePrefix: 'Sidebar' });

export default useStyles;

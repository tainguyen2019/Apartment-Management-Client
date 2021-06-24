import { makeStyles, Theme, createStyles } from '@material-ui/core';

const styles = (theme: Theme) =>
  createStyles({
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    title: {
      flexGrow: 1,
    },
  });

const useStyles = makeStyles(styles, { classNamePrefix: 'MyAppBar' });

export default useStyles;

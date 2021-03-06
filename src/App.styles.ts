import { makeStyles, createStyles } from '@material-ui/core';

const styles = createStyles({
  root: {},
  loadingPage: {
    position: 'fixed',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});

const useStyles = makeStyles(styles, { classNamePrefix: 'App' });

export default useStyles;

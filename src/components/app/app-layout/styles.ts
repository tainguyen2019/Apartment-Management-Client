import { makeStyles, Theme, createStyles } from '@material-ui/core';

const sidebarWidth = 256;

const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
    },
    rightContent: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    rightContentShift: {
      width: `calc(100% - ${sidebarWidth}px)`,
      marginLeft: sidebarWidth,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    sidebar: {
      width: sidebarWidth,
    },
    appContent: {
      position: 'relative',
      display: 'flex',
      flexGrow: 1,
      overflowY: 'auto',
    },
  });

const useStyles = makeStyles(styles, { classNamePrefix: 'AppLayout' });

export default useStyles;

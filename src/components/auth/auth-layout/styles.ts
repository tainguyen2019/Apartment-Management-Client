import { makeStyles, Theme, createStyles } from '@material-ui/core';

const styles = ({ spacing }: Theme) =>
  createStyles({
    root: {
      minHeight: '100vh',
    },
    column: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: `${spacing(9)}px 6%`,
    },
    leftColumn: {
      position: 'relative',
      alignItems: 'flex-end',
      color: 'orange',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
    },
    rightColumn: {
      position: 'relative',
      alignItems: 'flex-start',
      backgroundColor: 'white',
    },
    logo: {
      height: 120,
    },
    tradename: {
      height: 52,
      margin: spacing(3, 0, 0),
    },
    line: {
      width: spacing(50),
      marginTop: spacing(6),
      backgroundColor: 'white',
    },
    subtitle: {
      margin: spacing(5, 0, 0),
      fontSize: 40,
      fontWeight: 300,
    },
    title: {
      margin: spacing(0),
      fontSize: 45,
      fontWeight: 'bold',
      lineHeight: 0.9,
    },
    versionInfo: {
      marginTop: spacing(1.5),
    },
  });

const useStyles = makeStyles(styles, { classNamePrefix: 'AuthLayout' });

export default useStyles;

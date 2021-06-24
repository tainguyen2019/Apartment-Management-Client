import { makeStyles, Theme, createStyles } from '@material-ui/core';

const styles = (theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1,
    },
    pageSizeSelection: {
      margin: theme.spacing(0, 1),
    },
    ulPagination: {
      '&>li>button.Mui-selected': {
        fontWeight: 'bold',
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
      },
      '&>li>button:hover': {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
      },
    },
  });

const useStyles = makeStyles(styles, { classNamePrefix: 'MyPagination' });

export default useStyles;

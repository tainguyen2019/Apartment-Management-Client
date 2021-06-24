import { createStyles, makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    pagination: {
      marginTop: theme.spacing(3),
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
  }),
);

import { createStyles, makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(3, 3, 0, 3),
    },
    title: {
      marginBottom: theme.spacing(2),
    },
    form: {
      width: '100%',
    },
    actions: {
      marginTop: theme.spacing(3),
    },
  }),
);

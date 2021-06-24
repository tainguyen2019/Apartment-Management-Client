import { createStyles, makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(2),
      minWidth: 120,
    },
  }),
);

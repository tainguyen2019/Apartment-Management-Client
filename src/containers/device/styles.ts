import { createStyles, makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    pagination: {
      margin: theme.spacing(2),
    },
  }),
);

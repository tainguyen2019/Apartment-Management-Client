import { createStyles, makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    pagination: {
      marginTop: theme.spacing(3),
    },
  }),
);

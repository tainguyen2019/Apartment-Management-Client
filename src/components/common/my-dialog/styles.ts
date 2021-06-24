import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  container: {
    position: 'relative',
  },
  dialogHeader: {
    padding: theme.spacing(2, 3),
  },
  title: {
    padding: 0,
  },
  closeButton: {
    padding: 0,
  },
}));

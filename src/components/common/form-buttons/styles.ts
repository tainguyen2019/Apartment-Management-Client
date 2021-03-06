import { makeStyles, createStyles, Theme } from '@material-ui/core';

const styles = ({ spacing }: Theme) =>
  createStyles({
    root: {
      display: 'grid',
      gridTemplateColumns: `1fr 1fr`,
      gridGap: spacing(0, 2),
      alignSelf: 'flex-start',
    },
  });

const useStyles = makeStyles(styles, { classNamePrefix: 'FormButtons' });

export default useStyles;

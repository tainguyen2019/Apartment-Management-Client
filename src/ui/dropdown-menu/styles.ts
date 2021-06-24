import { makeStyles, Theme, createStyles } from '@material-ui/core';

const styles = ({ spacing }: Theme) =>
  createStyles({
    popper: {
      '& .MuiMenuItem-root': {
        paddingTop: spacing(1),
        paddingBottom: spacing(1),
      },
      '& .MuiListItemIcon-root': {
        minWidth: 0,
        marginRight: spacing(2),
      },
    },
  });

const useStyles = makeStyles(styles, {
  classNamePrefix: 'DropdownMenu',
});

export default useStyles;

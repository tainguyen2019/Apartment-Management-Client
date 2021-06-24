import { makeStyles, Theme, createStyles } from '@material-ui/core';

const styles = ({ zIndex }: Theme) =>
  createStyles({
    popper: ({ show }: DropdownStylesProps) => ({
      position: 'absolute',
      zIndex: show ? zIndex.tooltip : -1,
    }),
  });

const useStyles = makeStyles(styles, {
  classNamePrefix: 'Dropdown',
});

export default useStyles;

export interface DropdownStylesProps {
  show: boolean;
}

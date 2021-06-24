import { makeStyles, Theme, createStyles } from '@material-ui/core';
import IntroBackground from 'assets/images/intro_background.svg';

const styles = ({ spacing }: Theme) =>
  createStyles({
    root: {
      backgroundImage: `url(${IntroBackground})`,
      backgroundPosition: 'center',
      width: '50%',
      height: '50%',
      backgroundSize: 'cover',
    },
  });

const useStyles = makeStyles(styles, { classNamePrefix: 'Intro' });

export default useStyles;

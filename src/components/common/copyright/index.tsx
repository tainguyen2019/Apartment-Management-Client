import { Typography, Link } from '@material-ui/core';

const Copyright: React.FC = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="http://localhost:3000/">
        My apartment
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
};

export default Copyright;

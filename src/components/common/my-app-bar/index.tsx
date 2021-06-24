import { useState } from 'react';
import {
  AppBar,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import authService from 'services/auth';
import useToggle from 'hooks/useToggle';

import ChangePasswordDialog from '../../auth/change-password-dialog';
import ChangePasswordContext from '../../auth/change-password-dialog/ChangePasswordDialogContext';
import useStyles from './styles';

const MyAppBar: React.FC = () => {
  const classes = useStyles();
  const [openChangePassword, toggleChangePassword] = useToggle();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChangePassword = () => {
    handleClose();
    toggleChangePassword();
  };

  return (
    <ChangePasswordContext.Provider
      value={{ open: openChangePassword, onClose: toggleChangePassword }}
    >
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Chung cư ABC
          </Typography>
          <div>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-app-bar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-app-bar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleChangePassword}>Đổi mật khẩu</MenuItem>
              <MenuItem onClick={authService.logout}>Đăng xuất</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <ChangePasswordDialog />
    </ChangePasswordContext.Provider>
  );
};

export default MyAppBar;

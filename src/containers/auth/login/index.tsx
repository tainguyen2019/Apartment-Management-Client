import { Button, Box, Typography } from '@material-ui/core';

import useLoginWatcher from 'hooks/auth/useLoginWatcher';
import MyInput from 'components/common/my-input';
import AuthContent from 'components/auth/auth-content';
import Spin from 'ui/spin';
import useStyles from './styles';
import { useLoginForm } from './utils';

const Login: React.FC = () => {
  const classes = useStyles();
  const { form, handleLogin, loading } = useLoginForm();

  useLoginWatcher();

  return (
    <AuthContent title="Đăng nhập">
      <Box className={classes.root}>
        <Typography className={classes.title} variant="h2" color="primary">
          Welcome back
        </Typography>
        <Spin loading={loading}>
          <form className={classes.form} onSubmit={handleLogin}>
            <MyInput
              fullWidth
              autoFocus
              name="username"
              label="Tên đăng nhập"
              variant="outlined"
              margin="normal"
              helperText="Demo account: truongbql"
              control={form.control}
              rules={{
                required: true,
              }}
              InputProps={{ autoComplete: 'off' }}
            />
            <MyInput
              fullWidth
              type="password"
              name="password"
              label="Mật khẩu"
              variant="outlined"
              margin="normal"
              helperText="Demo password: 1"
              control={form.control}
              rules={{
                required: true,
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Đăng nhập
            </Button>
          </form>
        </Spin>
      </Box>
    </AuthContent>
  );
};

export default Login;

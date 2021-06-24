import { Suspense, lazy } from 'react';
import { Switch, Route, Redirect, Router } from 'react-router-dom';
import { Box, CssBaseline, ThemeProvider } from '@material-ui/core';
import { Provider } from 'react-redux';
import { SnackbarProvider } from 'notistack';

import store from 'redux/store';
import theme from 'theme';
import history from 'routes/history';

import Toast from 'components/common/toast';
import AppLayout from 'components/app/app-layout';
import AuthLayout from 'components/auth/auth-layout';
import Spin from 'ui/spin';
import PrivateRoute from 'routes/components/private-route';
import useStyles from './App.styles';

const App: React.FC = () => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <SnackbarProvider maxSnack={4}>
            <CssBaseline />
            <Toast />
            <Router history={history}>
              <Suspense
                fallback={<Spin className={classes.loadingPage} loading />}
              >
                <Switch>
                  <PrivateRoute path="/app" isProtected>
                    <AppLayout />
                  </PrivateRoute>
                  <Route path="/auth">
                    <AuthLayout />
                  </Route>
                  <Redirect from="/" to="/app/dashboard" exact />
                  <Route
                    component={lazy(() => import('containers/not-found'))}
                  />
                </Switch>
              </Suspense>
            </Router>
          </SnackbarProvider>
        </ThemeProvider>
      </Provider>
    </Box>
  );
};
export default App;

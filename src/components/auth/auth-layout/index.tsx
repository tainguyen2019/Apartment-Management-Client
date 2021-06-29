import React, { FC, memo } from 'react';
import { Grid, Typography } from '@material-ui/core';
import clsx from 'clsx';
import Routes from 'routes/components/routes';
import VersionInfo from 'components/common/version-info';
import { APP_NAME } from 'constants/common';
import { authRoutes } from 'routes';
import useStyles from './styles';

export const AuthLayoutComponent: FC = () => {
  const classes = useStyles();

  return (
    <Grid container className={classes.root}>
      <Grid
        className={clsx(classes.column, classes.leftColumn)}
        item
        xs={12}
        md={6}
      >
        <Typography className={classes.subtitle} variant="subtitle1">
          {APP_NAME}
        </Typography>
        <Typography className={classes.title} variant="h1">
          Chung cư ABC
        </Typography>
        <VersionInfo className={classes.versionInfo} />
      </Grid>
      <Grid
        className={clsx(classes.column, classes.rightColumn)}
        item
        xs={12}
        md={6}
      >
        <Routes routes={authRoutes} />
      </Grid>
    </Grid>
  );
};

const AuthLayout = memo(AuthLayoutComponent);
AuthLayout.displayName = 'AuthLayout';
export default AuthLayout;

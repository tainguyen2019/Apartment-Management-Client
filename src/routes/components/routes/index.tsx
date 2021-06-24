import React, { FC, memo, Suspense } from 'react';
import { Redirect, Switch } from 'react-router-dom';
import { RouteInfo, AuthInfo } from 'types/common';
import useRestriction from 'hooks/useRestriction';
import Spin from 'ui/spin';
import PrivateRoute from '../private-route';
import useStyles from './styles';

const flattenRoutes = (
  routes: RouteInfo[],
  isAccessible: (authInfo: AuthInfo) => boolean,
  collectedRoutes: RouteInfo[],
) => {
  routes.forEach((route) => {
    if (route.childRoutes)
      flattenRoutes(route.childRoutes, isAccessible, collectedRoutes);
    else if (isAccessible(route)) collectedRoutes.push(route);
  });
};

export const RoutesComponent: FC<RoutesProps> = ({ routes }) => {
  const classes = useStyles();
  const { isAccessible } = useRestriction();
  const allRoutes: RouteInfo[] = [];
  flattenRoutes(routes, isAccessible, allRoutes);

  return (
    <Suspense
      fallback={
        <Spin className={classes.loadingPage} loading color="secondary" />
      }
    >
      <Switch>
        {allRoutes.map(({ path, exact = true, ...props }) => (
          <PrivateRoute {...props} key={path} path={path} exact={exact} />
        ))}
        <Redirect from="/*" to="/not-found" />
      </Switch>
    </Suspense>
  );
};

const Routes = memo(RoutesComponent);
Routes.displayName = 'Routes';
export default Routes;

export interface RoutesProps {
  routes: RouteInfo[];
}

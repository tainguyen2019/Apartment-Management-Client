import React, {
  FC,
  memo,
  ReactNode,
  ComponentType,
  isValidElement,
} from 'react';
import { StaticContext } from 'react-router';
import { Route, Redirect, RouteComponentProps } from 'react-router-dom';
import authService from 'services/auth';
import { RouteInfo } from 'types/common';
import { authPaths } from '../../paths';

const renderRouteChild =
  ({
    isProtected,
    Component,
    children,
    redirectTo,
  }: {
    isProtected?: boolean;
    Component?: ComponentType<RouteChildProps>;
    children?: ReactNode | ((props: RouteChildProps) => ReactNode) | null;
    redirectTo?: string;
  }) =>
  (props: RouteChildProps) => {
    if (!!isProtected && !authService.isAuthenticated()) {
      return (
        <Redirect
          to={authPaths.login(redirectTo || window.location.pathname).path}
        />
      );
    }
    if (children) {
      if (isValidElement(children)) return children;
      return typeof children === 'function' ? children(props) : children;
    }
    if (Component) {
      return <Component {...props} />;
    }
    return null;
  };

export const PrivateRouteComponent: FC<ProtectedRouteProps> = ({
  isProtected,
  component: Component,
  children,
  redirectTo,
  ...props
}) => (
  <Route
    {...props}
    render={renderRouteChild({
      isProtected,
      Component,
      children,
      redirectTo,
    })}
  />
);

const PrivateRoute = memo(PrivateRouteComponent);
PrivateRoute.displayName = 'PrivateRoute';
export default PrivateRoute;

export interface ProtectedRouteProps
  extends OmitFrom<RouteInfo, 'title' | 'component' | 'render' | 'children'> {
  redirectTo?: string;
  component?: ComponentType<RouteChildProps>;
  children?: ReactNode | ((props: RouteChildProps) => ReactNode) | null;
}

type RouteChildProps = RouteComponentProps<any, StaticContext, any> | any;

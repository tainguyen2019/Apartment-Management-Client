import { lazy } from 'react';
import { RouteInfo } from 'types/common';
import { appPaths, authPaths } from './paths';

// App Routes with links on Sidebar
export const sidebarRoutes: RouteInfo[] = [
  {
    ...appPaths.dashboard(),
    icon: 'dashboard',
    component: lazy(() => import('containers/intro')),
  },
  {
    ...appPaths.accountManagement(),
    icon: 'people_outline',
    component: lazy(() => import('containers/account')),
  },
  {
    ...appPaths.waterIndex(),
    icon: 'opacity',
    component: lazy(() => import('containers/water-index')),
  },
  {
    ...appPaths.device(),
    icon: 'devices',
    component: lazy(() => import('containers/device')),
  },
  {
    ...appPaths.maintenance(),
    icon: 'handyman',
    component: lazy(() => import('containers/maintenance')),
  },
  {
    ...appPaths.arrange(),
    icon: 'place',
    component: lazy(() => import('containers/arrange')),
  },
  {
    ...appPaths.vehicle(),
    icon: 'motorcycle',
    component: lazy(() => import('containers/vehicle')),
  },
  {
    ...appPaths.staff(),
    icon: 'people',
    component: lazy(() => import('containers/staff')),
  },
  {
    ...appPaths.apartment(),
    icon: 'home',
    component: lazy(() => import('containers/apartment')),
  },
  {
    ...appPaths.event(),
    icon: 'event',
    component: lazy(() => import('containers/event')),
  },
  {
    ...appPaths.reflect(),
    icon: 'question_answer',
    component: lazy(() => import('containers/reflect')),
  },
  {
    ...appPaths.receipt(),
    icon: 'receipt',
    component: lazy(() => import('containers/receipt')),
  },
  {
    ...appPaths.payslip(),
    icon: 'payment',
    component: lazy(() => import('containers/payslip')),
  },
  {
    ...appPaths.shift(),
    icon: 'schedule',
    component: lazy(() => import('containers/shift')),
  },
  {
    ...appPaths.repair(),
    icon: 'build',
    component: lazy(() => import('containers/repair')),
  },
  {
    ...appPaths.fee(),
    icon: 'list',
    component: lazy(() => import('containers/fee')),
  },
  {
    ...appPaths.absence(),
    icon: 'perm_contact_calendar',
    component: lazy(() => import('containers/absence')),
  },
  {
    ...appPaths.notification(),
    icon: 'notifications',
    component: lazy(() => import('containers/notification')),
  },
];

// App Routes that don't have links on Sidebar
export const subRoutes: RouteInfo[] = [];

export const appRoutes = [...sidebarRoutes, ...subRoutes];

// Authentication Routes
export const authRoutes: RouteInfo[] = [
  {
    ...authPaths.login(),
    component: lazy(() => import('containers/auth/login')),
  },
];

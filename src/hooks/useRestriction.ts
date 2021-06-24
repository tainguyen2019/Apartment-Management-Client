import authService from 'services/auth';
import storageService from 'services/storage';
import { Feature } from 'constants/restrictions';
import { Privilege } from 'constants/users';

const isNotRestricted = () =>
  process.env.NODE_ENV === 'development' &&
  localStorage.getItem('restricted') === 'false';

const isFeatureEnabled = (feature: Feature | Feature[] | undefined) => {
  if (isNotRestricted() || feature === undefined) return true;
  const appFeatures = Array.isArray(feature) ? feature : [feature];
  const userFeatures = storageService.getItem<Feature[]>('features');
  return !!userFeatures && appFeatures.some((f) => userFeatures.includes(f));
};

const isPrivilegeGranted = (privilege: Privilege | Privilege[] | undefined) => {
  if (isNotRestricted() || privilege === undefined) return true;
  const appPrivileges = Array.isArray(privilege) ? privilege : [privilege];
  const userPrivileges = authService.getAuthData()?.privileges;
  return (
    !!userPrivileges && appPrivileges.some((p) => userPrivileges.includes(p))
  );
};

const isRoleAssigned = (role: string | string[] | undefined) => {
  if (isNotRestricted() || role === undefined) return true;
  const appRoles = Array.isArray(role) ? role : [role];
  const userRole = authService.getAuthData()?.role;
  return !!userRole && appRoles.includes(userRole);
};

const isAccessible = ({ feature, privilege, role }: RestrictionInfo) =>
  isFeatureEnabled(feature) &&
  isPrivilegeGranted(privilege) &&
  isRoleAssigned(role);

const useRestriction = () => ({
  isFeatureEnabled,
  isPrivilegeGranted,
  isRoleAssigned,
  isAccessible,
});

export default useRestriction;

export interface RestrictionInfo {
  feature?: Feature | Feature[];
  privilege?: Privilege | Privilege[];
  role?: string | string[];
}

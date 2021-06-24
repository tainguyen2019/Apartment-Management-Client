import { FC, memo, ReactElement } from 'react';
import { Feature } from 'constants/restrictions';
import useRestriction from 'hooks/useRestriction';
import { Privilege } from 'constants/users';

export const RestrictionComponent: FC<RestrictionProps> = ({
  feature,
  privilege,
  role,
  available = true,
  fallback = null,
  children,
}) => {
  const { isAccessible } = useRestriction();

  return available && isAccessible({ feature, privilege, role })
    ? children
    : fallback;
};

const Restriction = memo(RestrictionComponent);
Restriction.displayName = 'Restriction';
export default Restriction;

export interface RestrictionProps {
  feature?: Feature | Feature[];
  privilege?: Privilege | Privilege[];
  role?: string | string[];
  available?: boolean;
  fallback?: ReactElement | null;
  children: ReactElement;
}

import { PaginationData } from './common';

export interface Role {
  id: string;
  name: string;
  code: string;
}

export interface RoleResponseData extends PaginationData {
  roles: Role[];
}

export interface SearchRoleParams extends Partial<OmitFrom<Role, 'id'>> {
  page: number;
  pageSize: number;
}

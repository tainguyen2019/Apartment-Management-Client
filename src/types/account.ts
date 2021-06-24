import { PaginationData } from './common';

interface BaseAccount {
  id: string;
  username: string;
  role_id: string;
  type: string;
}

export interface Account extends BaseAccount {
  role_name: string;
  created_at: string;
  updated_at: string;
}

export interface CreateAccountValues extends OmitFrom<BaseAccount, 'id'> {
  password?: string;
  rePassword?: string;
}
export interface SearchAccountFormValues
  extends Partial<OmitFrom<CreateAccountValues, 'password' | 'rePassword'>> {
  from_date: string;
  to_date: string;
}

export type CreateAccountFormValues = CreateAccountValues;

export interface EditAccountFormValues {
  role_id: string;
  type: string;
}
export type UpdateAccountFormValues = CreateAccountValues;

export interface SearchAccountParams extends Partial<SearchAccountFormValues> {
  page: number;
  pageSize: number;
  available?: boolean;
}

export type UpdateAccountParams = { id: string } & OmitFrom<
  CreateAccountValues,
  'username'
>;

export interface AccountResponseData extends PaginationData {
  accounts: Account[];
}

export interface AccountDialogContextValues {
  open: boolean;
  account?: Account;
  onClose?: VoidFunction;
}

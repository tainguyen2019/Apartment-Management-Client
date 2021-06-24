import { createContext } from 'react';
import { RecordEditor } from 'types/common';
import { Account } from 'types/account';

interface AccountFormContextValues {
  onRefresh?: VoidFunction;
  onEdit?: RecordEditor<Account>;
}

const AccountFormContext = createContext<AccountFormContextValues>({});

export default AccountFormContext;

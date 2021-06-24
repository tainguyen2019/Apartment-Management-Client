import { createContext } from 'react';
import { AccountDialogContextValues } from 'types/account';

const defaultValues: AccountDialogContextValues = { open: false };
const AccountDialogContext = createContext(defaultValues);

export default AccountDialogContext;

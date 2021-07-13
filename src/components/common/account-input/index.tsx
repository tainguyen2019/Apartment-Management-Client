import {
  FieldPath,
  FieldValues,
  PathValue,
  UnpackNestedValue,
} from 'react-hook-form';

import AutoCompleteInput, {
  AutocompleteInputProps,
} from 'components/common/autocomplete-input';
import useBackendServiceCallback from 'hooks/useBackendServiceCallback';
import accountService from 'services/account';
import { Account } from 'types/account';

export type SimpleAccount = PickFrom<Account, 'id' | 'username'>;

function AccountInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  type,
  defaultAccounts = [],
  ...props
}: AccountInputProps<TFieldValues, TName>) {
  const [{ loading, data }, searchAccounts] = useBackendServiceCallback(
    accountService.search,
  );
  const getAccounts = (query: string) => {
    if (query) {
      searchAccounts({
        type,
        username: query,
        page: 1,
        pageSize: 10,
        available: true,
      });
    }
  };

  const getOptionSelected = (option: SimpleAccount, value: SimpleAccount) => {
    return option.id === value.id;
  };

  const getOptionLabel = ({ username }: SimpleAccount) => username;

  const getOptionValue = (option: SimpleAccount | null) =>
    (option?.id || '') as UnpackNestedValue<PathValue<TFieldValues, TName>>;

  const accounts: SimpleAccount[] = [
    ...defaultAccounts,
    ...(data?.accounts ?? []),
  ];

  return (
    <AutoCompleteInput
      {...props}
      label="Tài khoản"
      loading={loading}
      loadingText="Đang tìm tài khoản..."
      noOptionsText="Không tìm thấy tài khoản nào."
      options={accounts}
      getOptions={getAccounts}
      getOptionValue={getOptionValue}
      getOptionSelected={getOptionSelected}
      getOptionLabel={getOptionLabel}
    />
  );
}

export default AccountInput;

const omittedProperties = [
  'options',
  'getOptions',
  'getOptionValue',
  'getOptionSelected',
  'getOptionLabel',
] as const;

type OmittedProperty = typeof omittedProperties[number];

export interface AccountInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends OmitFrom<
    AutocompleteInputProps<TFieldValues, TName, SimpleAccount>,
    OmittedProperty
  > {
  defaultAccounts?: SimpleAccount[];
  type: 'internal' | 'external';
}

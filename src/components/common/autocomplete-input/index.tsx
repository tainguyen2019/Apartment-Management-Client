import { useCallback, useMemo, useState } from 'react';
import {
  Box,
  TextField,
  CircularProgress,
  TextFieldProps,
  Typography,
} from '@material-ui/core';
import {
  Autocomplete,
  AutocompleteInputChangeReason,
  Value,
} from '@material-ui/lab';
import {
  FieldPath,
  FieldValues,
  PathValue,
  UnpackNestedValue,
  useController,
  UseControllerProps,
  UseFormSetValue,
} from 'react-hook-form';

import useToggle from 'hooks/useToggle';
import useDebounceCallback from 'hooks/useDebounceCallback';
import useDidUpdate from 'hooks/useDidUpdate';

export interface AutocompleteInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TRecord extends any = any,
> extends UseControllerProps<TFieldValues, TName>,
    Omit<TextFieldProps, 'name' | 'defaultValue' | 'inputRef' | 'error'> {
  setValue: UseFormSetValue<TFieldValues>;
  options: TRecord[];
  defaultSelectedOption?: TRecord;
  getOptions: (query: string) => void;
  getOptionValue: (
    record: TRecord | null,
  ) => UnpackNestedValue<PathValue<TFieldValues, TName>>;
  getOptionSelected: (option: TRecord, value: TRecord) => boolean;
  getOptionLabel: (option: TRecord) => string;
  loading?: boolean;
  noOptionsText?: React.ReactNode;
  loadingText?: React.ReactNode;
  clearText?: string;
}

function AutocompleteInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TRecord extends any = any,
>({
  name,
  rules,
  defaultValue,
  control,
  shouldUnregister,
  InputLabelProps,
  options,
  noOptionsText,
  loadingText,
  defaultSelectedOption,
  loading = false,
  clearText = 'Xóa',
  setValue,
  getOptions,
  getOptionValue,
  getOptionSelected,
  getOptionLabel,
  ...fieldProps
}: AutocompleteInputProps<TFieldValues, TName, TRecord>) {
  const {
    fieldState: { error },
    field: { ref, value, ...fieldInputProps },
  } = useController<TFieldValues, TName>({
    name,
    rules,
    defaultValue,
    control,
    shouldUnregister,
  });
  const [query, setQuery] = useState('');
  const [open, toggle] = useToggle();
  const debouncedSetQuery = useDebounceCallback(
    (
      _event: React.ChangeEvent<{}>,
      textValue: string,
      reason: AutocompleteInputChangeReason,
    ) => {
      if (reason === 'clear' || reason === 'input') {
        setQuery(textValue);
      }
    },
    500,
  );
  const handleChange = useCallback(
    (
      _event: React.ChangeEvent<{}>,
      value: Value<TRecord, undefined, undefined, undefined>,
    ) => {
      const formValue = getOptionValue(value);
      setValue(name, formValue, { shouldValidate: true });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [name],
  );
  const endAdornment = useMemo(
    () => (loading ? <CircularProgress color="inherit" size={20} /> : null),
    [loading],
  );
  const errorMessage = error?.message;

  useDidUpdate(() => {
    getOptions(query);
  }, [query]);

  // TODO set default value
  return (
    <Box>
      <Autocomplete
        fullWidth
        open={open}
        defaultValue={defaultSelectedOption}
        options={options}
        loading={loading}
        clearText={clearText}
        loadingText={loadingText}
        noOptionsText={noOptionsText}
        getOptionLabel={getOptionLabel}
        getOptionSelected={getOptionSelected}
        onChange={handleChange}
        onClose={toggle}
        onInputChange={debouncedSetQuery}
        onOpen={toggle}
        renderInput={(params) => (
          <TextField
            {...params}
            {...fieldProps}
            {...fieldInputProps}
            inputRef={ref}
            variant="outlined"
            inputProps={{
              ...params.inputProps,
              autoComplete: 'off',
              'aria-autocomplete': 'none',
            }}
            InputLabelProps={{
              ...params.InputLabelProps,
              ...InputLabelProps,
              shrink: true,
            }}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {endAdornment}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
            error={!!errorMessage}
          />
        )}
      />
      {errorMessage && (
        <Box mt={1 / 2}>
          <Typography variant="caption" color="error">
            {errorMessage}
          </Typography>
        </Box>
      )}
    </Box>
  );
}

export default AutocompleteInput;

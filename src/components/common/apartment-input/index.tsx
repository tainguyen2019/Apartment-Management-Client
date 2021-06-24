import {
  FieldPath,
  FieldValues,
  PathValue,
  UnpackNestedValue,
  UseControllerProps,
  UseFormSetValue,
} from 'react-hook-form';

import AutoCompleteInput from 'components/common/autocomplete-input';
import useBackendServiceCallback from 'hooks/useBackendServiceCallback';
import apartmentService from 'services/apartment';
import { Apartment } from 'types/apartment';

function ApartmentInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  defaultApartments = [],
  ...props
}: ApartmentInputProps<TFieldValues, TName>) {
  const [{ loading, data }, searchApartments] = useBackendServiceCallback(
    apartmentService.search,
  );
  const getApartments = (query: string) => {
    if (query) {
      searchApartments({
        apartment_number: query,
        page: 1,
        pageSize: 10,
      });
    }
  };

  const getOptionSelected = (option: Apartment, value: Apartment) => {
    return option.id === value.id;
  };

  const getOptionLabel = ({ apartment_number }: Apartment) => apartment_number;

  const getOptionValue = (option: Apartment | null) =>
    (option?.id || '') as UnpackNestedValue<PathValue<TFieldValues, TName>>;

  const apartments = data?.apartments ?? defaultApartments;

  return (
    <AutoCompleteInput
      {...props}
      label="Căn hộ"
      loading={loading}
      loadingText="Đang tìm căn hộ..."
      noOptionsText="Không tìm thấy căn hộ nào."
      options={apartments}
      getOptions={getApartments}
      getOptionValue={getOptionValue}
      getOptionSelected={getOptionSelected}
      getOptionLabel={getOptionLabel}
    />
  );
}

export default ApartmentInput;

export interface ApartmentInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends UseControllerProps<TFieldValues, TName> {
  setValue: UseFormSetValue<TFieldValues>;
  defaultApartments?: Apartment[];
}

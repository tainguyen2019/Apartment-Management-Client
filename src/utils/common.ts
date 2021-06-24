import { BaseResponse, FailResponse, SuccessResponse } from 'types/common';

export function isSuccessResponse<TData>(
  res: BaseResponse<TData>,
): res is SuccessResponse<TData> {
  return res.kind === 'success';
}

export function isFailedResponse<TData>(
  res: BaseResponse<TData>,
): res is FailResponse {
  return res.kind === 'failed';
}

export const filterSearchParams = (params: Record<string, any>) => {
  const filteredParams = Object.fromEntries(
    Object.entries(params).filter(
      ([, value]) => Boolean(value) && String(value) !== 'Tất cả',
    ),
  );
  return filteredParams;
};

export const generateFormData = (values: Record<string, any>) => {
  const formData = new FormData();

  Object.entries(values).forEach(([fieldName, value]) => {
    if (value instanceof File) {
      formData.append(fieldName, value, value.name);
    } else {
      formData.append(fieldName, value);
    }
  });

  return formData;
};

export const formatCurrency = (value: unknown) =>
  typeof value === 'number' || typeof value === 'string'
    ? Number(value)
        .toFixed(0)
        .replace(/\d(?=(\d{3})+$)/g, '$&,')
        .concat('đ')
    : undefined;

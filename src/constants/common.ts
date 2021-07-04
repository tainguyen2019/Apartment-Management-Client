import { AsyncState } from 'types/common';

// ARRAYS
export const PAGE_SIZES = [10, 20, 30, 50];

// NUMBERS
export const NETWORK_TIMEOUT = 30000;
export const DEFAULT_PAGE_SIZE = PAGE_SIZES[0];

// STRINGS
export const DATE_FORMAT = 'DD/MM/YYYY';
export const TIME_FORMAT = 'HH:mm:ss';
export const DATE_TIME_FORMAT = `${DATE_FORMAT} ${TIME_FORMAT}`;
export const FIELD_DATE_FORMAT = 'YYYY-MM-DD';
export const NETWORK_TIMEOUT_MESSAGE = 'Network Timeout';
export const APP_NAME = 'Quản lý chung cư';

// URLS
export const API_URL = process.env.REACT_APP_API_URL!;

// OBJECTS
export const PENDING_STATE: AsyncState<any, any> = { loading: false };
export const LOADING_STATE: AsyncState<any, any> = { loading: true };
export const PAGE_SIZE_OPTIONS = PAGE_SIZES.map((pageSize) => ({
  value: pageSize,
  label: pageSize,
}));

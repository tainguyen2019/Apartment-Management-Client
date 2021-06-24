import { RouteProps } from 'react-router-dom';
import { Feature } from 'constants/restrictions';
import { Privilege } from 'constants/users';
import { FontIconType } from './fontIcons';

export interface ValueTargetEvent<TValue = string> {
  target: { value: TValue };
}

export interface StoreServiceState {
  readonly loading?: boolean;
}

export interface ServiceErrorState {
  code?: number;
  message?: string;
}

export interface AsyncServiceState<TData>
  extends StoreServiceState,
    ServiceErrorState {
  data?: TData;
}

export interface ServerResponse<TData = unknown> {
  data: TData;
  message: string;
}

export interface SuccessResponse<TData = unknown> {
  kind: 'success';
  data: TData;
  code: number;
  message: string;
}

export interface FailResponse {
  kind: 'failed';
  data: ServiceErrorState;
  code: number;
  message: string;
}

export type BaseResponse<TData = unknown> =
  | FailResponse
  | SuccessResponse<TData>;

export type AsyncState<TResult = unknown, TError = unknown> =
  | { loading: boolean; result?: undefined; error?: undefined }
  | { loading: false; result: TResult; error?: undefined }
  | { loading: false; result?: undefined; error: TError };

export interface GenericFunction<TArgs extends any[] = [], TReturn = void> {
  (...args: TArgs): TReturn;
}

export interface FunctionReturns<TReturn>
  extends GenericFunction<[], TReturn> {}

export type ValueFactory<TValue> = TValue | FunctionReturns<TValue>;

export interface PaginationData {
  total: number;
  totalPages: number;
  page: number;
  pageSize: number;
}

export type RecordEditor<TRecord> = (
  record: TRecord,
) => React.MouseEventHandler;

export interface AuthInfo {
  feature?: Feature;
  role?: string;
  privilege?: Privilege;
}

export interface LinkInfo extends AuthInfo {
  title: string;
  icon?: FontIconType;
  path: string;
}

export interface RouteInfo extends LinkInfo, OmitFrom<RouteProps, 'path'> {
  isProtected?: boolean;
  childRoutes?: RouteInfo[];
}

export interface AsyncState<TData = any> {
  loading: boolean;
  errorMessage?: string;
  data?: TData;
}

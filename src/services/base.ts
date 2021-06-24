import Axios, {
  AxiosRequestConfig,
  AxiosInstance,
  AxiosError,
  AxiosResponse,
} from 'axios';
import contentDisposition from 'content-disposition';
import { saveAs } from 'file-saver';

import {
  BaseResponse,
  ServiceErrorState,
  SuccessResponse,
  ServerResponse,
} from 'types/common';
import { NETWORK_TIMEOUT, NETWORK_TIMEOUT_MESSAGE } from 'constants/common';
import toastService from './toast';

const getErrorCodeAndMessage = (error: AxiosError) => ({
  code: error?.response?.status || 0,
  message: error.response?.data?.message || error?.message || 'Unknown error',
});

const getFilename = ({ headers }: AxiosResponse) => {
  const contentDispositionHeader = headers['content-disposition'];
  const {
    parameters: { filename = 'Unknown' },
  } = contentDisposition.parse(contentDispositionHeader);
  return filename;
};

export default abstract class BaseService {
  private readonly instance: AxiosInstance;

  private readonly cachedResponses: Record<string, SuccessResponse<unknown>> =
    {};

  constructor(config?: AxiosRequestConfig) {
    this.instance = Axios.create(config);
  }

  protected requestData = async <TResponseData, TResultData = TResponseData>(
    {
      cacheKey,
      shouldNotifyError = true,
      shouldNotifySuccess = false,
      timeout = NETWORK_TIMEOUT,
      timeoutErrorMessage = NETWORK_TIMEOUT_MESSAGE,
      ...rest
    }: BaseRequestConfig,
    transformData?: TransformData<TResponseData, TResultData>,
  ): Promise<BaseResponse<TResultData>> => {
    if (cacheKey) {
      const cachedRes = this.cachedResponses[cacheKey];
      if (cachedRes) return cachedRes as SuccessResponse<TResultData>;
    }

    let code: number;
    let message: string;
    let data: unknown;

    try {
      const res = await this.instance.request<ServerResponse<TResponseData>>({
        timeout,
        timeoutErrorMessage,
        ...rest,
      });

      ({ data, message } = res.data);

      const resData = res.data.data;
      const resultData = (
        transformData ? await transformData(resData) : resData
      ) as TResultData;

      // Show toast success
      if (shouldNotifySuccess) {
        toastService.notify(message, 'success');
      }

      const successResponse: SuccessResponse<TResultData> = {
        message,
        kind: 'success',
        data: resultData,
        code: res.status,
      };

      // Save cache response to cache key
      if (cacheKey) {
        this.cachedResponses[cacheKey] = successResponse;
      }

      return successResponse;
    } catch (error) {
      ({ code, message } = getErrorCodeAndMessage(error));
      data = { code, message };

      // Show toast error
      if (shouldNotifyError) {
        toastService.notify(message, 'error');
      }
    }

    return {
      code,
      message,
      kind: 'failed',
      data: data as ServiceErrorState,
    };
  };

  protected requestFile = async ({
    timeout = NETWORK_TIMEOUT,
    responseType = 'blob',
    shouldNotifyError = true,
    shouldNotifySuccess = false,
    ...rest
  }: BaseRequestConfig): Promise<BaseResponse<Blob>> => {
    let code: number;
    let message: string;

    try {
      const res = await this.instance.request<Blob | ServerResponse<void>>({
        timeout,
        responseType,
        ...rest,
      });

      if (res.data instanceof Blob) {
        saveAs(res.data, getFilename(res));
        message = 'Download successfully';
        if (shouldNotifySuccess) toastService.notify(message, 'success');
        return { kind: 'success', code: 200, data: res.data, message };
      }

      ({
        status: code,
        data: { message },
      } = res);
    } catch (error) {
      ({ code, message } = getErrorCodeAndMessage(error));
    }

    if (shouldNotifyError) toastService.notify(message, 'error');
    return { kind: 'failed', data: {}, code, message };
  };
}

export interface BaseRequestConfig extends AxiosRequestConfig {
  shouldNotifyError?: boolean;
  shouldNotifySuccess?: boolean;
  cacheKey?: string;
}

export type TransformData<TFrom, TTo> = (data: TFrom) => TTo | Promise<TTo>;

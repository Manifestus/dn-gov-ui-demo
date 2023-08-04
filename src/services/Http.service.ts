import Axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

export type HttpClientRequestInterceptor = (
  values: AxiosRequestConfig
) => AxiosRequestConfig | Promise<AxiosRequestConfig>;

export type HttpClientResponseInterceptor = (
  values: AxiosResponse
) => AxiosResponse | Promise<AxiosResponse>;

export abstract class HttpService {
  protected readonly _axios: AxiosInstance;

  protected handleResponse = <T>({ data }: AxiosResponse<T>) => data;

  protected handleError = (error: any) => Promise.reject(error);

  protected addRequestInterceptor = (
    interceptor: HttpClientRequestInterceptor
  ) => {
    this._axios.interceptors.request.use();
  };

  protected addResponseInterceptor = (
    interceptor: HttpClientResponseInterceptor
  ) => {
    this._axios.interceptors.response.use(interceptor);
  };

  private initInterceptor = () => {
    this._axios.interceptors.response.use(undefined, this.handleError);
  };

  constructor(baseURL: string) {
    this._axios = Axios.create({
      baseURL: baseURL,
      timeout: 5000,
      transformResponse: [
        function (data) {
          return data;
        },
      ],
    });

    this.initInterceptor();
  }
}

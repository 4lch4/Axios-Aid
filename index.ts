import axios, { AxiosBasicCredentials, AxiosInstance } from 'axios'

/**
 * The only class exported by this module which contains the sole helper
 * function within the module.
 */
export class AxiosAid {
  /** The instance of Axios used for executing requests. */
  private client: AxiosInstance

  /** Contains the headers that are used with the Axios instance. */
  readonly headers?: Object

  /**
   * The constructor of the AxiosAid class. Accepts one mandatory base URL param
   * for whatever API/website you wish to interact with. Then when you use the
   * performRequest method, only provide the endpoint without the base and it
   * will be concatenated. If you supply a headers parameter, it will be used
   * as the request headers for every request sent.
   *
   * @param baseUrl The base URL for the API/website you wish to interact with.
   * @param headers An optional Object that can be passed as the headers of each request.
   * @param auth The optional credentials to provide if the API requires basic auth.
   */
  constructor(baseUrl: string, headers?: Object, auth?: AxiosBasicCredentials) {
    this.client = axios.create({
      baseURL: baseUrl,
      timeout: 60000,
      headers: headers,
      auth: auth
    })

    this.headers = headers
  }

  /**
   * Executes a request using the given HTTP method to the given endpoint. If a
   * payload is provided, it is either sent along in the request body or URL
   * parameters, depending on how it's provided. If any headers are provided,
   * they are sent along with this single request and not used for any future
   * requests.
   *
   * @param method The HTTP method you wish to perform/execute.
   * @param endpoint The endpoint of the API/website you wish to send a request to.
   * @param payload The optional request body or URL params of the request.
   * @param headers The optional headers to send along with the request.
   */
  async performRequest(
    method: RequestMethod,
    endpoint: string,
    payload?: RequestPayload,
    headers?: Object
  ) {
    return this.client({
      method: method,
      url: endpoint,
      data: payload ? payload.data : undefined,
      params: payload ? payload.params : undefined,
      headers: headers
    })
  }
}

export interface RequestPayload {
  /**
   * The URL Parameters to be appended to the URL. Must be a POJO or
   * URLSearchParams object.
   */
  params?: Object

  /** The data to be sent as the request body. */
  data?: Object
}

/**
 * The available methods to be used/sent along with the request.
 */
export type RequestMethod =
  | 'get'
  | 'GET'
  | 'delete'
  | 'DELETE'
  | 'head'
  | 'HEAD'
  | 'options'
  | 'OPTIONS'
  | 'post'
  | 'POST'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH'
  | 'link'
  | 'LINK'
  | 'unlink'
  | 'UNLINK'

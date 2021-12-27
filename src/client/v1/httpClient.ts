/* eslint-disable no-console */
import * as querystring from 'querystring';
import axios, { AxiosRequestConfig, Method } from 'axios';

export const SUCCESS_API_RESULTS_CODE: Array<number> = [200, 201, 204];

export default class HttpClient {
  protected response?: any;
  protected baseUrl: string;
  protected username: string;
  protected password: string;

  constructor(baseUrl: string, username: string, password: string) {
    this.baseUrl = baseUrl;
    this.username = username;
    this.password = password;
  }
  // eslint-disable-next-line class-methods-use-this
  public async call(apiVerb: Method, endpoint: string, payload: any) {
    let apiPayload = {};
    let constructedEndpoint = endpoint;

    if (Array.isArray(payload) === false && payload.id) {
      // if id is present do a api/entity/id
      constructedEndpoint += `/${payload.id}`;
      if (apiVerb === 'patch') {
        apiPayload = payload;
      }
    } else if (Array.isArray(payload) === false && apiVerb === 'get') {
      // add payload to query string
      const encodedParams = querystring.stringify(payload);
      constructedEndpoint += `?${encodedParams}`;
    } else {
      // add the payload in the data config
      apiPayload = payload;
    }

    const httpConfigs: AxiosRequestConfig = {
      url: constructedEndpoint,
      method: apiVerb,
      baseURL: this.baseUrl,
      headers: { 'X-Requested-With': 'XMLHttpRequest' },
      withCredentials: true,
      auth: {
        username: this.username,
        password: this.password,
      },
      data: apiPayload,
      responseType: 'json',
    };
    let apiResult;
    try {
      apiResult = await axios(httpConfigs);
    } catch (error: any) {
      console.log(`Error Calling API ${JSON.stringify(error)}`);
      return false;
    }

    this.response = apiResult;
    console.log(`api result ${JSON.stringify(this.response)}`);

    if (SUCCESS_API_RESULTS_CODE.indexOf(apiResult.status) !== -1) {
      return this.response;
    }
    throw new Error(`Client Invalid Result ${JSON.stringify(httpConfigs)}`);
  }
}

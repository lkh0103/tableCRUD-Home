import axios from "axios";
import { AxiosRequestConfig } from "axios";

const API = axios.create({
    baseURL: '',
    headers: {
        // Accept: EContentType.JSON,
        // ...contentType(EContentType.JSON)
    },
    withCredentials: true
});

export interface IMethod {
    [method: string]: string
}
export enum EMethod {
    GET = "get",
    POST = "post",
    PUT = "put",
    PATCH = "patch",
    HEAD = "head",
    DELETE = "delete"
}

export interface IApiResponse<T> {
    success: boolean;
    data: T | null;
    errors: any;
    headers?: any;
}

export type IResponse<T> = Promise<IApiResponse<T>>;



export default function execApi<T>(
    method: any,
    uri: string,
    data?: any,
    headers?: any,
    configs?: any
) {
    configs = configs ?? {};
    Object.assign(configs, { url: uri, method, headers, data: null });

    if (data) {
        if (configs.method === EMethod.GET) configs.method = EMethod.POST;

        if (data instanceof FormData) {
            // headers = Object.assign(headers, contentType(EContentType.BINARY));
            configs.data = data;
        } else {
            configs.data = data;//JSON.stringify(data);
        }
    }


    //add token in headers
    // Object.assign(configs, { headers: configs.headers || {} });
    // let get_token = getToken()

    // !configs.headers.Authorization
    // && Object.assign(configs.headers, getAuthHeader(get_token))
    // && Object.assign(configs.headers, getAuthHeader('MTM0NDo0ZjIwN2M3Njg4ZWExNTdkNWIxNzU2NDRlOTQ5YTM3YTVlNjA2MTVm'))

    return API.request(configs)
        .then((response: any) => {
            const result: any = {
                data: null,
                success: false,
                headers: null,
                errors: [],
            };

            const result1: any = {
                ...result,
                current_page: 1,
                total_items: 0,
                total_page: 0
            };

            let hasPaging = false;

            try {
                result.success = Math.floor(response.status / 200) === 1;

                if (result.success) {
                    result.data = response.data;
                    result.success = true;
                    result.errors = [];
                    result.headers = response.headers

                    if ('total_page' in response.data) {
                        hasPaging = true;
                        result1.total_page = response.data.total_page ?? 0;
                        result1.total_items = response.data.total_items ?? 0;
                        result1.current_page = response.data.current_page ?? 1;
                    }
                } else {
                    result.errors = response.data.errors ?? 'ON_RESPONSE_ERROR';
                }
            } catch (e) {
                result.errors = 'ON_PARSE_ERROR';
            }

            return hasPaging ? { ...result1, ...result } as any : result;
        })
        .catch((error) => {
            // 2 type of error (call to server and sv reply error, client has no internet)
            if (error.response && error.response.data) {

                if (Math.floor(error.response.status / 500) === 1) {
                    // showNotification ({type: "error", message: translate('MAINTEN_SYSTEM'), title: 'Error'});
                }

                const response = error.response.data;
                response.success = false;
                response.status_code = error.response.status;

                //check error code
                if (response?.error_code && response?.status_code !== 403) {
                    const { error_code, description } = response
                    // kiểm tra reload page
                    // if(error_code in CONSTANT_ERROR_CODE.LOAD_PAGE){
                    // showNotification({type: "error", message: translate(CONSTANT_LOAD_PAGE[error_code]), title: 'Error'});
                    // setTimeout(reloadToLogin,3000 );
                    // }
                    // if(error_code in CONSTANT_ERROR_CODE.MESSAGE_ERROR_CODE){
                    // showNotification({type: "error", message: translate(error_code), title: 'Error'});
                    // }else{
                    // showNotification({type: "error", message: translate('MAINTEN_SYSTEM'), title: 'Error'});
                    // }
                }

                return response;
            }
        });


}


export function apiGet<T>(
    uri: string,
    headers?: any,
    configs?: AxiosRequestConfig
) {
    return execApi<T>(EMethod.GET, uri, undefined, headers, configs);
}

export function apiPost<T>(
    uri: string,
    data?: any,
    headers?: any,
    configs?: AxiosRequestConfig
) {
    return execApi(EMethod.POST, uri, data, headers, configs);
}

export function apiPut<T>(
    uri: string,
    data?: any,
    headers?: any,
    configs?: AxiosRequestConfig
) {
    return execApi(EMethod.PUT, uri, data, headers, configs);
}

export function apiPatch<T>(
    uri: string,
    data?: any,
    headers?: any,
    configs?: AxiosRequestConfig
) {
    return execApi(EMethod.PATCH, uri, data, headers, configs);
}

export function apiDelete<T>(
    uri: string,
    data?: any,
    headers?: any,
    configs?: AxiosRequestConfig
): IResponse<T> {
    return execApi(EMethod.PATCH, uri, data, headers, configs);
}

export function apiHead<T>(
    uri: string,
    data?: any,
    headers?: any,
    configs?: AxiosRequestConfig
) {
    return execApi(EMethod.HEAD, uri, data, headers, configs);
}

export function api<T>(
    method: EMethod,
    uri: string,
    data?: any,
    headers?: any,
    configs?: AxiosRequestConfig
) {
    switch (method) {
        case EMethod.POST:
            return apiPost<T>(uri, data, headers, configs);

        case EMethod.PUT:
            return apiPut(uri, data, headers, configs);

        case EMethod.PATCH:
            return apiPatch(uri, data, headers, configs);

        case EMethod.HEAD:
            return apiHead(uri, data, headers, configs);

        case EMethod.DELETE:
            return apiDelete(uri, data, headers, configs);

        default:
            return apiGet<T>(uri, headers, configs);
    }
}


// import axios, { AxiosRequestConfig } from "axios";
// import { useState } from "react";

// const createRequest = (options: AxiosRequestConfig) => {
//     const defaultOptions: AxiosRequestConfig = {}
//     return axios.create(
//         Object.assign({}, defaultOptions, options)
//     )
// }

// export default function useRequestWithState() {
//     const [loading, setLoading] = useState(false)
//     const [error, setError] = useState<string>('')
//     const request = createRequest({})

//     const api = (url: string) => {
//         setLoading(true)
//         return request(url)
//             .then(data => {
//                 return data.data
//             })
//             .catch((e) => {
//                 if (e.response) {
//                     // Request made and server responded
//                     console.log(e.response.data);
//                     console.log(e.response.status);
//                     console.log(e.response.headers);
//                 } else if (e.request) {
//                     // The request was made but no response was received
//                     console.log(e.request);
//                 } else {
//                     // Something happened in setting up the request that triggered an Error
//                     console.log('Error', e.message);
//                 }
//                 setError(e.message)
//             })
//             .finally(() => setLoading(false))
//     }

//     return {
//         loading,
//         api,
//         error
//     }
// }

// export const useRequest = () => {
//     const request = createRequest({})
//     return request
// }



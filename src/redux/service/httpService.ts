import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import qs from "qs";
import { store } from "../store";
import { logout } from "../slice/Authen/login";

const BASE_URL = "http://103.82.20.139:3000/api/";
const TIME_OUT = 5000;

type ApiConfig<T = any> = {
  uri: string;
  params?: Object;
  request?: any;
  token?: String;
};

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
});

let isRefreshing = false;
let refreshSubscribers: any[] = [];

const refreshAccessToken = async (): Promise<string | null> => {
  console.log("refreshing...");
  try {
    const refreshToken = await AsyncStorage.getItem("refreshToken");

    const response = await axios.post(
      `${BASE_URL}auths/refresh-token`,
      {
        refreshToken,
      },
      {
        timeout: TIME_OUT,
      }
    );

    // Save the new access token to the AsyncStorage
    await AsyncStorage.setItem("accessToken", response.data.accessToken);

    // Resolve all the subscribers with the new access token
    refreshSubscribers.forEach((callback) =>
      callback(response.data.accessToken)
    );

    // Reset the refresh flag and subscribers array
    isRefreshing = false;
    refreshSubscribers = [];

    // Return the new access token
    return response.data.accessToken;
  } catch (error) {
    store.dispatch(logout())
    window.location.href = '/auth/login';
    // If there is an error, return null
    return null;
  }
};

// Set the authorization header for the Axios instance
const setAuthorizationHeader = async (config: any) => {
  // Get the access token from the AsyncStorage
  const accessToken = await AsyncStorage.getItem("accessToken");

  // If there is an access token, set the authorization header
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
};

// Add a request interceptor to the Axios instance
axiosInstance.interceptors.request.use(
  async (config: any) => {
    // Set the authorization header
    await setAuthorizationHeader(config);

    // If the request is a refresh token request, return the config
    if (config.url === "/refresh-token") {
      return config;
    }

    // If the access token is not present, return the config
    if (!config.headers.Authorization) {
      return config;
    }

    // If the access token is present and the refresh flag is false, return the config
    if (!isRefreshing) {
      return config;
    }

    // If the access token is present and the refresh flag is true, block the request and add it to the subscribers array
    await new Promise((resolve) => refreshSubscribers.push(resolve));
    config.headers.Authorization = `Bearer ${await AsyncStorage.getItem(
      "accessToken"
    )}`;
    return config;
  },
  (error: AxiosError) => {
    // If there is an error, return the Promise.reject() method
    return Promise.reject(error);
  }
);

// Add a response interceptor to the Axios instance
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    // If the response is successful,
    return response;
  },
  async (error: any) => {
    // If the error is not an authentication error, return the Promise.reject() method
    if (error.response && error.response.status !== 401) {
      return Promise.reject(error);
    }
    if (error.response && error.response.status === 404) {
      store.dispatch(logout())
      window.location.href = '/auth/login';
    }
    // If the error is an authentication error and the refresh flag is false, set the refresh flag and refresh the access token
    if (error.response && error.response.status === 401 && !isRefreshing) {
      isRefreshing = true;

      const accessToken = await refreshAccessToken();

      // If the access token is refreshed, retry the original request
      if (accessToken) {
        const originalRequest = error.config;
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return axiosInstance(originalRequest);
      }
    }

    // If the error is an authentication error and the refresh flag is true, block the request and add it to the subscribers array
    if (error.response && error.response.status === 401 && isRefreshing) {
      return new Promise((resolve) => {
        refreshSubscribers.push((accessToken: string) => {
          error.config.headers.Authorization = `Bearer ${accessToken}`;
          resolve(axiosInstance(error.config));
        });
      });
    }


    // If there is an error that is not related to authentication, return the Promise.reject() method
    return Promise.reject(error);
  }
);

export const httpService = {
  async GET<T, O>(apiConfig: ApiConfig<T>) {
    const { uri, params, ...rest } = apiConfig;
    try {
      const res = await axiosInstance.get<O>(uri, {
        params,
        ...rest,
      });
      return res.data;
    } catch (error) {
      throw error;
    }
  },

  async POST<T, O>(apiConfig: ApiConfig<T>) {
    const { uri, request, params, ...rest } = apiConfig;
    try {
      const res = await axiosInstance.post<O>(uri, request, {
        params,
        ...rest,
      });
      return res.data;
    } catch (error) {
      throw error;
    }
  },

  async PUT<T, O>(apiConfig: ApiConfig<T>) {
    const { uri, request, params, ...rest } = apiConfig;
    try {
      const res = await axiosInstance.put<O>(uri, request, {
        params,
        ...rest,
      });
      return res.data;
    } catch (error) {
      throw error;
    }
  },
  async PATCH<T, O>(apiConfig: ApiConfig<T>) {
    const { uri, request, params, ...rest } = apiConfig;
    try {
      const res = await axiosInstance.patch<O>(uri, request, {
        params,
        ...rest,
      });
      return res.data;
    } catch (error) {
      throw error;
    }
  },
  async DELETE<T, O>(apiConfig: ApiConfig<T>) {
    const { uri, params, ...rest } = apiConfig;
    try {
      const res = await axiosInstance.delete<O>(uri, {
        params,
        ...rest,
      });
      return res.data;
    } catch (error) {
      throw error;
    }
  },

  async POST_ENCODED<T, O>(apiConfig: ApiConfig<T>) {
    const { uri, request, params } = apiConfig;
    const body = qs.stringify(request);
    try {
      const res = await axiosInstance.post<O>(uri, body, {
        ...params,
        headers: {
          ...(params as any)?.headers,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      return res.data;
    } catch (error) {
      throw error;
    }
  },

  async PUT_ENCODED<T, O>(apiConfig: ApiConfig<T>) {
    const { uri, request, params } = apiConfig;

    const body = qs.stringify(request);
    try {
      const res = await axiosInstance.put<O>(uri, body, {
        ...params,
        headers: {
          ...(params as any)?.headers,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      return res.data;
    } catch (error) {
      throw error;
    }
  },

  async POST_FORM_DATA<T, O>(apiConfig: ApiConfig<T>) {
    const { uri, request, params } = apiConfig;

    try {
      const res = await axiosInstance.post<O>(uri, request, {
        ...params,
        headers: {
          ...(params as any)?.headers,
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data;
    } catch (error) {
      throw error;
    }
  },

  async PUT_FORM_DATA<T, O>(apiConfig: ApiConfig<T>) {
    const { uri, request, params } = apiConfig;

    try {
      const res = await axiosInstance.put<O>(uri, request, {
        ...params,
        headers: {
          ...(params as any)?.headers,
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data;
    } catch (error) {
      throw error;
    }
  },
};

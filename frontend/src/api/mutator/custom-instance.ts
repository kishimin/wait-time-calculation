import { create } from "axios";
import type { AxiosError, AxiosRequestConfig } from "axios";
import { LOCAL_STORAGE_KEY } from "../../types/localstorage";

export const AXIOS_INSTANCE = create({
  baseURL: import.meta.env.VITE_API_URL,
});

AXIOS_INSTANCE.interceptors.request.use((config) => {
  const token = localStorage.getItem(LOCAL_STORAGE_KEY.TOKEN);

  if (token) {
    config.headers.set("Authorization", `Bearer ${token}`);
  }

  return config;
});

export const customInstance = <T>(config: AxiosRequestConfig): Promise<T> => {
  const promise = AXIOS_INSTANCE({ ...config }).then(
    ({ data }) => data as Promise<T>,
  );

  return promise;
};

export default customInstance;

export type ErrorType<Error> = AxiosError<Error>;

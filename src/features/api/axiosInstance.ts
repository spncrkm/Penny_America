import axios, { InternalAxiosRequestConfig } from "axios";
import { clearTokens, setTokens } from "../authSlice";
import { AppDispatch, RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v0/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;

export const axiosApi = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

axiosApi.interceptors.request.use(
  (config: InternalAxiosRequestConfig<any>) => {
    const accessToken = useSelector((state: RootState) => state.auth.access);
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const dispatch = useDispatch<AppDispatch>();

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = useSelector(
        (state: RootState) => state.auth.refresh
      );

      try {
        const response = await axiosApi.post("/api/v0/accounts/refresh", {
          refreshToken,
        });
        const { access, refresh } = response.data;

        dispatch(setTokens({ access: access, refresh: refresh }));

        axiosApi.defaults.headers.common["Authorization"] = `Bearer ${access}`;

        return axiosApi(originalRequest);
      } catch (refreshError) {
        dispatch(clearTokens());
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);


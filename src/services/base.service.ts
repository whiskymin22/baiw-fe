import type { UnInterceptedApiError } from "@/types/api";
import axios from "axios";
import type {
    AxiosError,
    AxiosInstance,
    InternalAxiosRequestConfig,
} from "axios";
import queryString from "query-string";
import { getAccessToken, setAccessToken, AUTH_LOGOUT } from "@/lib/auth-store";

export class BaseService {
    private static instance: BaseService;
    private readonly axiosClient: AxiosInstance;

    private constructor() {
        this.axiosClient = this.createAxiosInstance();
        this.setupInterceptors();
    }

    public static getInstance(): BaseService {
        if (!BaseService.instance) {
            BaseService.instance = new BaseService();
        }
        return BaseService.instance;
    }

    public getClient(): AxiosInstance {
        return this.axiosClient;
    }

    private createAxiosInstance(): AxiosInstance {
        const baseURL = import.meta.env.VITE_API_URL + "/v1/api";

        return axios.create({
            baseURL,
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            withCredentials: true,
            paramsSerializer: (params) => queryString.stringify(params),
        });
    }

    private setupInterceptors(): void {
        this.setupRequestInterceptor();
        this.setupResponseInterceptor();
    }

    private setupRequestInterceptor(): void {
        this.axiosClient.interceptors.request.use(
            (config: InternalAxiosRequestConfig) => {
                const accessToken = getAccessToken();
                if (accessToken) {
                    config.headers.Authorization = `Bearer ${accessToken}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );
    }

    private setupResponseInterceptor(): void {
        this.axiosClient.interceptors.response.use(
            (response) => response,
            async (error: AxiosError) => {
                const originalRequest =
                    error.config as InternalAxiosRequestConfig & {
                        _retry?: boolean;
                    };

                if (
                    error.response?.status === 401 &&
                    originalRequest &&
                    !originalRequest._retry &&
                    !originalRequest.url?.includes("/refresh-token")
                ) {
                    originalRequest._retry = true;

                    try {
                        // Call refresh token endpoint using the existing instance
                        // We use a clean instance or specific URL to avoid infinite loops if this fails,
                        // but since we are handling 401 specifically, it should be fine as long as refresh endpoint doesn't return 401 loop eternally without clearing.

                        // NOTE: using this.axiosClient.post might trigger this interceptor again if it fails with 401.
                        // Ideally we should use a separate instance or bypass interceptor, but for simplicity assuming clear failure on refresh.

                        const refreshResponse = await this.axiosClient.post(
                            "/refresh-token"
                        );
                        const newAccessToken =
                            refreshResponse.data.data.tokens.accessToken;

                        setAccessToken(newAccessToken);

                        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                        return this.axiosClient(originalRequest);
                    } catch (refreshError) {
                        setAccessToken(null);
                        window.dispatchEvent(new Event(AUTH_LOGOUT));
                        return Promise.reject(refreshError);
                    }
                }

                return this.handleResponseError(
                    error as AxiosError<UnInterceptedApiError>
                );
            }
        );
    }

    private handleResponseError(
        error: AxiosError<UnInterceptedApiError>
    ): Promise<never> {
        if (error.response?.data?.message) {
            return Promise.reject({
                ...error,
                response: {
                    ...error.response,
                    data: {
                        ...error.response.data,
                        message:
                            typeof error.response.data.message === "string"
                                ? error.response.data.message
                                : Object.values(
                                      error.response.data.message
                                  )[0][0],
                    },
                },
            });
        }
        return Promise.reject(error);
    }
}

export const baseService = BaseService.getInstance();

import type { AxiosInstance } from "axios";
import { BaseService, baseService } from "./base.service";

export interface User {
    _id: string;
    username: string;
    email: string;
    roles: string[];
}

export interface LoginPayload {
    email: string;
    password: string;
}

export interface SignupPayload {
    username: string;
    email: string;
    password: string;
}

export interface LoginResponse {
    user: User;
    tokens: {
        accessToken: string;
    };
}

export interface RefreshResponse {
    user: User;
    tokens: {
        accessToken: string;
    };
}

export class AuthService {
    private static instance: AuthService;
    private readonly api: AxiosInstance;
    private readonly baseService: BaseService;

    constructor(baseService: BaseService) {
        this.baseService = baseService;
        this.api = this.baseService.getClient();
    }

    public static getInstance(baseService: BaseService): AuthService {
        if (!AuthService.instance) {
            AuthService.instance = new AuthService(baseService);
        }
        return AuthService.instance;
    }

    signup = async (data: SignupPayload) => {
        const response = await this.api.post("/signup", data);
        return response.data;
    };

    login = async (data: LoginPayload): Promise<LoginResponse> => {
        const response = await this.api.post<{ data: LoginResponse }>(
            "/login",
            data
        );
        return response.data.data;
    };

    refreshToken = async (): Promise<RefreshResponse> => {
        const response = await this.api.post<{ data: RefreshResponse }>(
            "/refresh-token"
        );
        return response.data.data;
    };

    logout = async (): Promise<void> => {
        await this.api.post("/logout");
    };
}

export const authService = AuthService.getInstance(baseService);

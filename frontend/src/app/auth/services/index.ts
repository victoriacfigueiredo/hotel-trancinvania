import apiService from "../../../shared/services/api-service";
import { LoginFormInputs } from "../forms/LoginForm";
import { LoginResponse } from "../models/LoginModel";

export async function loginClient({
  username,
  password,
}: LoginFormInputs): Promise<LoginResponse> {
  const response = await apiService.post<LoginResponse>("/auth/client/login", {
    username,
    password,
  });
  localStorage.setItem("accessToken", response.data.token);
  return response.data;
}

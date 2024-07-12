import apiService from "../../../shared/services/api-service";
import { LoginFormInputs } from "../forms/LoginForm";
import { LoginResponse } from "../models/LoginModel";
import { ResetTokenInputs } from "../forms/ResetForm";
import { RecoveryFormInputs } from "../forms/RecoveryForm";
import { RecoveryEmailResponse } from "../models/PasswordModel";

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

export async function resetPasswordClient({
  token,
  newPassword,
}: ResetTokenInputs): Promise<void> {
  await apiService.post("/auth/client/reset-password", {
    token,
    newPassword,
  });
}

export async function sendRecoveryEmailClient({
  email,
}: RecoveryFormInputs): Promise<RecoveryEmailResponse> {
  const response = await apiService.post<RecoveryEmailResponse>(
    "/auth/client/recover-password",
    {
      email,
    }
  );
  return response.data;
}

export async function loginHotelier({
  username,
  password,
}: LoginFormInputs): Promise<LoginResponse> {
  const response = await apiService.post<LoginResponse>(
    "/auth/hotelier/login",
    {
      username,
      password,
    }
  );
  localStorage.setItem("accessToken", response.data.token);
  return response.data;
}

export async function resetPasswordHotelier({
  token,
  newPassword,
}: ResetTokenInputs): Promise<void> {
  await apiService.post("/auth/hotelier/reset-password", {
    token,
    newPassword,
  });
}

export async function sendRecoveryEmailHotelier({
  email,
}: RecoveryFormInputs): Promise<RecoveryEmailResponse> {
  const response = await apiService.post<RecoveryEmailResponse>(
    "/auth/hotelier/recover-password",
    {
      email,
    }
  );
  return response.data;
}

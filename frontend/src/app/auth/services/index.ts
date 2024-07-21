import apiService from "../../../shared/services/api-service";
import { LoginFormInputs } from "../forms/login-form";
import { LoginResponse } from "../models/LoginModel";
import { ResetTokenInputs } from "../forms/reset-form";
import { RecoveryFormInputs } from "../forms/recovery-form";
import { RecoveryEmailResponse } from "../models/PasswordModel";
import {
  RegisterClientFormInputsWithoutConfirmPassword,
  RegisterHotelierFormInputsWithoutConfirmPassword,
} from "../forms/register-form";
import { UpdateClientFormInputs } from "../forms/update-form";

export async function loginClient({
  username,
  password,
}: LoginFormInputs): Promise<LoginResponse> {
  const response = await apiService.post<LoginResponse>("/auth/client/login", {
    username,
    password,
  });
  localStorage.setItem("accessToken", response.data.token);
  localStorage.setItem("userType", "client");
  localStorage.setItem("userName", username);
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

export async function registerClient(
  data: RegisterClientFormInputsWithoutConfirmPassword
): Promise<void> {
  const response = await apiService.post("/client/create", data);
  console.log(response.data);
  return response.data;
}

//Atualizar dados do cliente
export async function updateClientData(
  data: UpdateClientFormInputs,
  id: string
): Promise<void> {
  const response = await apiService.patch(`/client/update/${id}`, data);
  console.log(response.data);
  return response.data;
}
export async function registerHotelier(
  data: RegisterHotelierFormInputsWithoutConfirmPassword
): Promise<void> {
  const response = await apiService.post("/hotelier/create", data);
  console.log(response.data);
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
  localStorage.setItem("userType", "hotelier");
  localStorage.setItem("userName", username);
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

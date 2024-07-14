import { useMutation } from "@tanstack/react-query";
import {
  loginClient,
  loginHotelier,
  resetPasswordHotelier,
  sendRecoveryEmailHotelier,
  resetPasswordClient,
  sendRecoveryEmailClient,
  registerClient,
} from "../services";
import { RegisterClientFormInputs } from "../forms/RegisterForm";

export function useLoginClientMutation() {
  return useMutation({
    mutationFn: loginClient,
  });
}
export function useResetPasswordClientMutation() {
  return useMutation({
    mutationFn: resetPasswordClient,
  });
}

export function useSendRecoveryEmailClientMutation() {
  return useMutation({
    mutationFn: sendRecoveryEmailClient,
  });
}

export function useRegisterClientMutation() {
  return useMutation({
    mutationFn: (data: RegisterClientFormInputs) => registerClient(data),
  });
}

export function useLoginHotelierMutation() {
  return useMutation({
    mutationFn: loginHotelier,
  });
}

export function useResetPasswordHotelierMutation() {
  return useMutation({
    mutationFn: resetPasswordHotelier,
  });
}

export function useSendRecoveryEmailHotelierMutation() {
  return useMutation({
    mutationFn: sendRecoveryEmailHotelier,
  });
}

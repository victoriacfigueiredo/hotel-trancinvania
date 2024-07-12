import { useMutation } from "@tanstack/react-query";
import {
  loginClient,
  loginHotelier,
  resetPasswordHotelier,
  sendRecoveryEmailHotelier,
  resetPasswordClient,
  sendRecoveryEmailClient,
} from "../services";

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

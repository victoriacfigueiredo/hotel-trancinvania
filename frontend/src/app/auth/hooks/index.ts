import { useMutation } from "@tanstack/react-query";
import { loginClient } from "../services";

export function useLoginClientMutation() {
  return useMutation({
    mutationFn: loginClient,
  });
}

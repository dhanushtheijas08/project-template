"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { AuthTypes } from "@/types";
import { useAuth } from "@/context/AuthContext";
import { UseFormReturn } from "react-hook-form";

export const useSignInMutation = (form: UseFormReturn<AuthTypes>) => {
  const router = useRouter();
  const { signIn } = useAuth();

  return useMutation({
    mutationFn: async (values: AuthTypes) => {
      await signIn(values.email, values.password);
    },
    onSuccess: () => {
      toast.success("Sign In successfully");
      router.push("/dashboard");
      form.reset();
    },
    onError: (error: any) => {
      toast.error(error.message);
      form.reset();
    },
  });
};

export const useSignUpMutation = (form: UseFormReturn<AuthTypes>) => {
  const router = useRouter();
  const { signUp } = useAuth();

  return useMutation({
    mutationFn: async (values: AuthTypes) => {
      await signUp(values.email, values.password);
    },
    onSuccess: () => {
      toast.success("Sign Up successfully");
      router.push("/dashboard");
      form.reset();
    },
    onError: (error: any) => {
      toast.error(error.message);
      form.reset();
    },
  });
};

export const useSignOutMutation = () => {
  const router = useRouter();
  const { signOut } = useAuth();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      router.push("/sign-in");
      await signOut();
    },
    onSuccess: () => queryClient.clear(),
    onError: (error: any) => {
      toast.error(error.message);
    },
  });
};

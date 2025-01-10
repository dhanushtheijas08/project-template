"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authDetails } from "@/constant";
import { useSignInMutation } from "@/mutations/useAuthMutation";
import { authSchema } from "@/schema";
import { AuthTypes } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export const SignInForm = () => {
  const form = useForm<AuthTypes>({
    resolver: zodResolver(authSchema),
  });

  const { mutate, status } = useSignInMutation(form);
  const onSubmit = (values: AuthTypes) => mutate(values);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {authDetails.map((detail) => (
          <FormField
            key={detail.label}
            control={form.control}
            name={detail.name as keyof AuthTypes}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{detail.label}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder={detail.placeholder}
                    type={detail.type}
                    disabled={status === "pending"}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        <Button
          type="submit"
          className="w-full"
          disabled={status === "pending"}
        >
          {status === "pending" ? "Loading..." : "Sign In"}
        </Button>
      </form>
    </Form>
  );
};

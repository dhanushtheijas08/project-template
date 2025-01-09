"use client";
import AuthCard from "@/components/auth/auth-card";
import { SignInForm } from "@/components/auth/sign-in-form";

export default function Page() {
  return (
    <AuthCard
      cardName="Login"
      cardDescription="Enter your email below to login to your account"
      type="sign-in"
    >
      <SignInForm />
    </AuthCard>
  );
}

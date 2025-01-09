"use client";
import AuthCard from "@/components/auth/auth-card";
import { SignUpForm } from "@/components/auth/sign-up-form";

export default function Page() {
  return (
    <AuthCard
      cardName="Sign Up"
      cardDescription="Create an account to get started"
      type="sign-up"
    >
      <SignUpForm />
    </AuthCard>
  );
}

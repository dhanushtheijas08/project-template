"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AuthCardProps } from "@/types";
import Link from "next/link";

const AuthCard = ({
  children,
  cardName,
  cardDescription,
  type,
}: AuthCardProps) => {
  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{cardName}</CardTitle>
          {cardDescription && (
            <CardDescription> {cardDescription} </CardDescription>
          )}
        </CardHeader>
        <CardContent>
          {children}
          <div className="mt-4">
            {type === "sign-in" ? (
              <div className="text-center text-sm text-muted-foreground">
                Don&apos;t have an account?{" "}
                <Link
                  href="sign-up"
                  className="underline underline-offset-4 hover:text-primary"
                >
                  Sign up
                </Link>
              </div>
            ) : (
              <div className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link
                  href="sign-in"
                  className="underline underline-offset-4 hover:text-primary"
                >
                  Sign in
                </Link>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthCard;

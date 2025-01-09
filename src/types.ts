import { z } from "zod";
import { authSchema } from "@/schema";

export type AuthTypes = z.infer<typeof authSchema>;

export type AuthCardProps = {
  children: React.ReactNode;
  cardName: string;
  cardDescription?: string;
  type: "sign-in" | "sign-up";
};

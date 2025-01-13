import { getDocumentById, getDocuments } from "@/lib/firebaseService";
import { UserWithId } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useFetchUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const result = await getDocuments("users");
      return result.data as UserWithId[];
    },
  });
};
export const useFetchUserById = (userId: string) => {
  return useQuery({
    queryKey: ["users", userId],
    queryFn: async () => {
      const result = await getDocumentById("users", userId);
      return result.data as UserWithId;
    },
  });
};

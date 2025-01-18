import {
  getDocumentById,
  getDocuments,
  getDocumentsWithFilters,
  WhereCondition,
} from "@/lib/firebaseService";
import { TodoType, UserWithId } from "@/types";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

export const useFetchUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const result = await getDocuments("users");
      return result.data as UserWithId[];
    },
  });
};

export const useFetchTodos = (userId: string) => {
  return useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const result = await getDocumentsWithFilters("todos", {
        whereConditions: [["userId", "==", userId]],
      });
      return result?.data as TodoType[];
    },
    enabled: !!userId,
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

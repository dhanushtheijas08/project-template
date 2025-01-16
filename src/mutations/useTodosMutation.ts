import { useAuth } from "@/context/AuthContext";
import {
  createDocument,
  deleteDocument,
  updateDocument,
} from "@/lib/firebaseService";
import { TodoType } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateTodo = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (todo: TodoType) => {
      await createDocument("todos", todo);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos", user?.uid] });
      toast.success("Todo created successfully");
    },
  });
};

export const useDeleteTodo = () => {
  const { user } = useAuth();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (todoId: string) => {
      await deleteDocument("todos", todoId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos", user?.uid] });
      toast.success("Todo deleted successfully");
    },
  });
};

export const useDeleteMultipleTodos = () => {
  const { user } = useAuth();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (todoIds: string[]) => {
      await Promise.all(
        todoIds.map(async (id) => {
          await deleteDocument("todos", id);
        })
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos", user?.uid] });
      toast.success("Todos deleted successfully");
    },
  });
};

export const useEditTodo = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: any) => {
      await updateDocument("todos", data.id, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos", user?.uid] });
      toast.success("Todo has been successfully updated");
    },
  });
};

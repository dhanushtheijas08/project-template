import {
  createDocument,
  deleteDocument,
  updateDocument,
} from "@/lib/firebaseService";
import { TodoType } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (todo: TodoType) => {
      await createDocument("todos", todo);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      toast.success("Todo created successfully");
    },
  });
};

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (todoId: string) => {
      await deleteDocument("todos", todoId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      toast.success("Todo deleted successfully");
    },
  });
};

export const useEditTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: any) => {
      await updateDocument("todos", data.id, data);
    },
    onSuccess: () => {
      toast.success("Todo has been successfully updated");
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};

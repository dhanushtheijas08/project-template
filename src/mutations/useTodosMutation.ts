import { createDocument } from "@/lib/firebaseService";
import { TodoType } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateTodo = () => {
  return useMutation({
    mutationFn: async (todo: TodoType) => {
      await createDocument("todos", todo);
    },
    onSuccess: () => {
      toast.success("Todo created successfully");
    },
  });
};

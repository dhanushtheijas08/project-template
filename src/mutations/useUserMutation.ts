import { deleteDocument } from "@/lib/firebaseService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userId: string) => {
      await deleteDocument("users", userId);
    },
    onSuccess: () => {
      toast.success("User has been successfully deleted");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

export const useEditUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: any) => {
      console.log(data);
    },
    onSuccess: () => {
      toast.success("User has been successfully updated");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

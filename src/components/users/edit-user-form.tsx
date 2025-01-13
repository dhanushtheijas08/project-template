import { editUserSchema } from "@/schema";
import { EditUserType, UserWithId } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEditUser } from "@/mutations/useUserMutation";

const EditUserForm = ({
  userId,
  userData,
  setDialogOpen,
  setIsEditing,
}: {
  userId: string;
  userData: UserWithId;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const form = useForm<EditUserType>({
    resolver: zodResolver(editUserSchema),
    defaultValues: {
      email: userData.email || "",
      role: userData.role,
    },
  });

  const { mutate: editUser, status } = useEditUser();

  function onSubmit(values: EditUserType) {
    setIsEditing(true);
    editUser(values, {
      onSuccess: () => {
        setDialogOpen(false);
        setIsEditing(false);
      },
    });
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-2"
        id="edit-user-form"
      >
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={status === "pending"}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="user">User</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="ram@gmail.com"
                  type="email"
                  disabled={status === "pending"}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default EditUserForm;

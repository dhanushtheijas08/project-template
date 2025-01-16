import { todoSchema } from "@/schema";
import { TodoType } from "@/types";
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
import { useAuth } from "@/context/AuthContext";
import { useEditTodo } from "@/mutations/useTodosMutation";

const EditTodoForm = ({
  todoId,
  todoData,
  setDialogOpen,
  setIsEditing,
}: {
  todoId: string;
  todoData: TodoType;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { user } = useAuth();
  const form = useForm<TodoType>({
    resolver: zodResolver(todoSchema),
    defaultValues: {
      title: todoData.title,
      status: todoData.status,
      userId: user?.uid,
      id: todoId,
    },
  });

  const { mutate: editTodo, status } = useEditTodo();

  const onSubmit = (values: TodoType) => {
    setIsEditing(true);
    editTodo(values, {
      onSuccess: () => {
        setDialogOpen(false);
        setIsEditing(false);
      },
    });
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-2"
        id="edit-todo-form"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="some title"
                  disabled={status === "pending"}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={status === "pending"}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status of the todo" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="not-started">Not Started</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default EditTodoForm;

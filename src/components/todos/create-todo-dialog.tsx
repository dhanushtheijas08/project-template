"use client";
import {
  ResponsiveDialog,
  ResponsiveDialogContent,
  ResponsiveDialogFooter,
  ResponsiveDialogHeader,
  ResponsiveDialogTitle,
  ResponsiveDialogTrigger,
} from "@/components/responsive-dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import CreateTodoForm from "./create-todo-form";
import { Icons } from "../icons";

const TodoIcon = Icons.Todo;

const CreateTodoDialog = () => {
  const [isCreating, setIsCreating] = useState(false);
  return (
    <ResponsiveDialog open={isCreating} onOpenChange={setIsCreating}>
      <ResponsiveDialogTrigger asChild>
        <Button>
          <TodoIcon /> Create
        </Button>
      </ResponsiveDialogTrigger>

      <ResponsiveDialogContent>
        <ResponsiveDialogHeader>
          <ResponsiveDialogTitle>Create Todo</ResponsiveDialogTitle>
        </ResponsiveDialogHeader>

        <CreateTodoForm setIsCreating={setIsCreating} />

        <ResponsiveDialogFooter>
          <Button type="submit" form="create-todo-form" disabled={!isCreating}>
            {isCreating ? "Create" : "Creating..."}
          </Button>
        </ResponsiveDialogFooter>
      </ResponsiveDialogContent>
    </ResponsiveDialog>
  );
};
export default CreateTodoDialog;

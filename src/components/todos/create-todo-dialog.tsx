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
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  return (
    <ResponsiveDialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <ResponsiveDialogTrigger asChild>
        <Button>
          <TodoIcon /> Create
        </Button>
      </ResponsiveDialogTrigger>

      <ResponsiveDialogContent>
        <ResponsiveDialogHeader>
          <ResponsiveDialogTitle>Create Todo</ResponsiveDialogTitle>
        </ResponsiveDialogHeader>

        <CreateTodoForm
          setIsCreating={setIsCreating}
          setDialogOpen={setDialogOpen}
        />

        <ResponsiveDialogFooter>
          <Button type="submit" form="create-todo-form" disabled={isCreating}>
            {isCreating ? "Creating..." : "Create"}
          </Button>
        </ResponsiveDialogFooter>
      </ResponsiveDialogContent>
    </ResponsiveDialog>
  );
};
export default CreateTodoDialog;

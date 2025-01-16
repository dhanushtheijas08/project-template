"use client";
import {
  ResponsiveDialog,
  ResponsiveDialogContent,
  ResponsiveDialogFooter,
  ResponsiveDialogHeader,
  ResponsiveDialogTitle,
} from "@/components/responsive-dialog";
import { Button } from "@/components/ui/button";
import { TodoType } from "@/types";
import { useState } from "react";
import EditUserForm from "./edit-todo-form";

const EditTodoDialog = ({
  todoId,
  dialogOpen,
  setDialogOpen,
  todoData,
}: {
  todoId: string;
  dialogOpen: boolean;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  todoData: TodoType;
}) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <ResponsiveDialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <ResponsiveDialogContent>
        <ResponsiveDialogHeader>
          <ResponsiveDialogTitle>Edit Todo </ResponsiveDialogTitle>
        </ResponsiveDialogHeader>

        <EditUserForm
          todoId={todoId}
          todoData={todoData}
          setDialogOpen={setDialogOpen}
          setIsEditing={setIsEditing}
        />

        <ResponsiveDialogFooter>
          <Button type="submit" form="edit-todo-form" disabled={isEditing}>
            {isEditing ? "Editing..." : "Edit"}
          </Button>
        </ResponsiveDialogFooter>
      </ResponsiveDialogContent>
    </ResponsiveDialog>
  );
};
export default EditTodoDialog;

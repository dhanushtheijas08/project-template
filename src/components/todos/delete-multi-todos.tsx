"use client";
import { Icons } from "@/components//icons";
import {
  ResponsiveDialog,
  ResponsiveDialogContent,
  ResponsiveDialogDescription,
  ResponsiveDialogFooter,
  ResponsiveDialogHeader,
  ResponsiveDialogTitle,
  ResponsiveDialogTrigger,
} from "@/components/responsive-dialog";
import { Button } from "@/components/ui/button";
import { useDeleteMultipleTodos } from "@/mutations/useTodosMutation";
import { useState } from "react";

const DeleteIcon = Icons.Trash;
const DeleteMultiTodosDialog = ({ todoIds }: { todoIds: string[] }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { mutate: deleteTodos, status } = useDeleteMultipleTodos();
  return (
    <ResponsiveDialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <ResponsiveDialogTrigger asChild>
        <Button className="ml-auto">{`Delete (${todoIds.length})`} </Button>
      </ResponsiveDialogTrigger>
      <ResponsiveDialogContent>
        <ResponsiveDialogHeader>
          <ResponsiveDialogTitle>
            Are you absolutely sure?
          </ResponsiveDialogTitle>
          <ResponsiveDialogDescription>
            This action cannot be undone. This will permanently delete the
            account and remove your data from our servers.
          </ResponsiveDialogDescription>
        </ResponsiveDialogHeader>
        <ResponsiveDialogFooter>
          <Button
            variant="outline"
            onClick={() => setDialogOpen(false)}
            disabled={status === "pending"}
          >
            Cancel
          </Button>

          <Button
            variant="destructive"
            onClick={() =>
              deleteTodos(todoIds, {
                onSuccess: () => setDialogOpen(false),
              })
            }
            disabled={status === "pending"}
          >
            <DeleteIcon className="h-4 w-4 ml-1 text-muted-foreground" />
            {status === "pending" ? "Deleting..." : "Delete "}
          </Button>
        </ResponsiveDialogFooter>
      </ResponsiveDialogContent>
    </ResponsiveDialog>
  );
};
export default DeleteMultiTodosDialog;

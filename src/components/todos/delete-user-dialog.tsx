"use client";
import { Icons } from "@/components//icons";
import {
  ResponsiveDialog,
  ResponsiveDialogContent,
  ResponsiveDialogDescription,
  ResponsiveDialogFooter,
  ResponsiveDialogHeader,
  ResponsiveDialogTitle,
} from "@/components/responsive-dialog";
import { Button } from "@/components/ui/button";
import { useDeleteUser } from "@/mutations/useUserMutation";

const DeleteIcon = Icons.Trash;
const DeleteUserDialog = ({
  userId,
  dialogOpen,
  setDialogOpen,
}: {
  userId: string;
  dialogOpen: boolean;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { mutate: deleteUser, status } = useDeleteUser();

  return (
    <ResponsiveDialog open={dialogOpen} onOpenChange={setDialogOpen}>
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
              deleteUser(userId, {
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
export default DeleteUserDialog;

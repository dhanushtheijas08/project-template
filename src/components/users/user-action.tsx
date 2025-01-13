import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DeleteUserDialog from "@/components/users/delete-user-dialog";
import { UserWithId } from "@/types";
import { Row } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import EditUserDialog from "./edit-user-dialog";

const CopyIcon = Icons.Copy;
const EditIcon = Icons.Edit;
const DeleteIcon = Icons.Trash;

const UserAction = ({ row }: { row: Row<UserWithId> }) => {
  const userId = row.original.id;
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  return (
    <>
      <DeleteUserDialog
        userId={userId}
        dialogOpen={deleteDialogOpen}
        setDialogOpen={setDeleteDialogOpen}
      />

      <EditUserDialog
        userId={userId}
        dialogOpen={editDialogOpen}
        setDialogOpen={setEditDialogOpen}
        userData={row.original}
      />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => {
              navigator.clipboard.writeText(userId);
              toast.success("User ID copied to clipboard");
            }}
          >
            <CopyIcon className="h-4 w-4 ml-1 text-muted-foreground" />
            Copy User ID
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setEditDialogOpen(true)}>
            <EditIcon className="h-4 w-4 ml-1 text-muted-foreground" />
            Edit User
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setDeleteDialogOpen(true)}>
            <DeleteIcon className="h-4 w-4 ml-1 text-muted-foreground" />
            <span>Delete User</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default UserAction;

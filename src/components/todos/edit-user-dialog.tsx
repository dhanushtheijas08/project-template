"use client";
import { Icons } from "@/components//icons";
import {
  ResponsiveDialog,
  ResponsiveDialogContent,
  ResponsiveDialogFooter,
  ResponsiveDialogHeader,
  ResponsiveDialogTitle,
} from "@/components/responsive-dialog";
import { Button } from "@/components/ui/button";
import { UserWithId } from "@/types";
import { useState } from "react";
import EditUserForm from "./edit-user-form";

const EditUserDialog = ({
  userId,
  dialogOpen,
  setDialogOpen,
  userData,
}: {
  userId: string;
  dialogOpen: boolean;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  userData: UserWithId;
}) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <ResponsiveDialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <ResponsiveDialogContent>
        <ResponsiveDialogHeader>
          <ResponsiveDialogTitle>Edit User </ResponsiveDialogTitle>
        </ResponsiveDialogHeader>

        <EditUserForm
          userId={userId}
          userData={userData}
          setDialogOpen={setDialogOpen}
          setIsEditing={setIsEditing}
        />

        <ResponsiveDialogFooter>
          <Button type="submit" form="edit-user-form" disabled={isEditing}>
            {isEditing ? "Editing..." : "Submit"}
          </Button>
        </ResponsiveDialogFooter>
      </ResponsiveDialogContent>
    </ResponsiveDialog>
  );
};
export default EditUserDialog;

"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { UserWithId } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import UserAction from "@/components/users/user-action";

export const userColumns: ColumnDef<UserWithId>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "id",
    header: "User Id",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <UserAction row={row} />,
  },
];

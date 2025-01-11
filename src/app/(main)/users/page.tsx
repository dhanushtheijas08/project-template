import { UsersTable } from "@/components/users/users-table";

export default function UsersPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold sm:text-3xl">Users</h1>
      <UsersTable />
    </div>
  );
}

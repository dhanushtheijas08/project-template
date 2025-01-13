"use client";
import { ProtectedRoute } from "@/components/protected-route";
import { userColumns } from "@/components/users/user-columns";
import { UsersTable } from "@/components/users/users-table";
import { useFetchUsers } from "@/queries/useUsers";

const UsersPage = () => {
  const { data: usersData, isLoading } = useFetchUsers();

  return (
    <ProtectedRoute allowedRoles={["admin", "user"]}>
      <div className="space-y-4">
        <h1 className="text-2xl font-bold sm:text-3xl">Users</h1>
        {isLoading ? (
          <p>Loading..</p>
        ) : (
          usersData &&
          usersData.length !== 0 && (
            <UsersTable columns={userColumns} data={usersData} />
          )
        )}
      </div>
    </ProtectedRoute>
  );
};
export default UsersPage;

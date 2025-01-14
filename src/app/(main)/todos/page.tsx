"use client";
import { ProtectedRoute } from "@/components/protected-route";
import CreateTodoDialog from "@/components/todos/create-todo-dialog";
import { userColumns } from "@/components/users/user-columns";
import { UsersTable } from "@/components/users/users-table";
import { useAuth } from "@/context/AuthContext";
import { useFetchTodos, useFetchUsers } from "@/queries/useUsers";

const TodosPage = () => {
  const { user } = useAuth();
  const { data: usersData, isLoading } = useFetchUsers();
  const { data: todosData } = useFetchTodos(user?.uid || "");

  return (
    <ProtectedRoute allowedRoles={["admin", "user"]}>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold sm:text-3xl">Todos</h1>

          <CreateTodoDialog />
        </div>
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
export default TodosPage;

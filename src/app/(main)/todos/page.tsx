"use client";
import { ProtectedRoute } from "@/components/protected-route";
import TableSkeleton from "@/components/table-skeleton";
import CreateTodoDialog from "@/components/todos/create-todo-dialog";
import { todosColumns } from "@/components/todos/todos-columns";
import { TodosTable } from "@/components/todos/todos-table";
import { useAuth } from "@/context/AuthContext";
import { useFetchTodos } from "@/queries/useTodos";

const TodosPage = () => {
  const { user } = useAuth();
  const { data: todosData, isLoading } = useFetchTodos(user?.uid || "");

  return (
    <ProtectedRoute allowedRoles={["admin", "user"]}>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold sm:text-3xl">Todos</h1>

          <CreateTodoDialog />
        </div>
        {isLoading ? (
          <TableSkeleton />
        ) : (
          <TodosTable columns={todosColumns} data={todosData || []} />
        )}
      </div>
    </ProtectedRoute>
  );
};
export default TodosPage;

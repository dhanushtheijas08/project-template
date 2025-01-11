"use client";
import OverviewLoader from "@/components/dashboard/overview-card-loader";
import { Icons } from "@/components/icons";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useOverviewQuery } from "@/queries/useDashboard";

const DashboardPage = () => {
  const { data, isLoading } = useOverviewQuery();
  const UserIcon = Icons.Users;

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Dashboard Overview</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {isLoading ? (
          Array.from({ length: 2 }).map((_, index) => (
            <OverviewLoader key={index} />
          ))
        ) : (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>

              <UserIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold"> {data?.totalUsers} </div>
              <p className="text-xs text-muted-foreground">
                +{data?.activeUsers}% from last month
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </>
  );
};

export default DashboardPage;

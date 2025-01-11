import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const OverviewLoader = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          <Skeleton className="h-4 w-24" />
        </CardTitle>
        <Skeleton className="h-4 w-4 " />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-8 w-20  mb-2" />
        <Skeleton className="h-3 w-32 " />
      </CardContent>
    </Card>
  );
};

export default OverviewLoader;

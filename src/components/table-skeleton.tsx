"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronDown } from "lucide-react";

const TableSkeleton = () => {
  return (
    <div className="w-full space-y-4">
      <div className="flex justify-between items-center">
        <div className="w-[300px]">
          <Skeleton className="h-10 w-full" />
        </div>
        <Button variant="outline" className="ml-auto">
          Columns
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </div>

      <div className="rounded-md border ">
        <div className="grid grid-cols-[40px_1fr_1fr_40px] gap-4 p-4 border-b ">
          <div className="flex items-center justify-center">
            <Skeleton className="h-4 w-4 " />
          </div>
          <div>
            <Skeleton className="h-4 w-16 " />
          </div>
          <div>
            <Skeleton className="h-4 w-16 " />
          </div>
          <div />
        </div>

        {[1, 2, 3].map((row) => (
          <div
            key={row}
            className="grid grid-cols-[40px_1fr_1fr_40px] gap-4 p-4 border-b"
          >
            <div className="flex items-center justify-center">
              <Skeleton className="h-4 w-4 " />
            </div>
            <div>
              <Skeleton className="h-4 w-[140px] " />
            </div>
            <div>
              <Skeleton className="h-4 w-[100px] " />
            </div>
            <div>
              <Skeleton className="h-4 w-4 " />
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-[200px]" />
        <div className="flex gap-2">
          <Button variant="outline" disabled>
            Previous
          </Button>
          <Button variant="outline" disabled>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};
export default TableSkeleton;

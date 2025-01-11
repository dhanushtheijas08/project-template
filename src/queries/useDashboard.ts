import { getDocumentById } from "@/lib/firebaseService";
import { AnalyticsType } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useOverviewQuery = () => {
  return useQuery({
    queryKey: ["overview"],
    queryFn: async () => {
      const overviewData = await getDocumentById<AnalyticsType>(
        "analytics",
        "0lLfcyYgsh9HYLRhEDue"
      );
      return overviewData.data;
    },
  });
};

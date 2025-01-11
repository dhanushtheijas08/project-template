import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { IconName } from "@/types";
import { Icons } from "@/components/icons";

type OverviewCardProps = {
  title: string;
  icon: IconName;
  primaryValue: string;
  secondaryValue: string;
};

const OverviewCard = ({
  icon,
  primaryValue,
  secondaryValue,
  title,
}: OverviewCardProps) => {
  const Icon = Icons[icon] || Icons.Settings;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{primaryValue}</div>
        <p className="text-xs text-muted-foreground">{secondaryValue}</p>
      </CardContent>
    </Card>
  );
};

export default OverviewCard;

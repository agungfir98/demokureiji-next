import { Card } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

const CardSkeleton = () => {
  return (
    <Card>
      <Skeleton className="h-10 w-1/2" />
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-10 w-1/3" />
          <Skeleton className="h-48 w-full" />
        </div>
        <div className="flex flex-col gap-2">
          <Skeleton className="h-10 w-1/3" />
          <Skeleton className="h-48 w-full" />
        </div>
      </div>
    </Card>
  );
};

export default CardSkeleton;

import { Separator } from "@radix-ui/react-separator";
import { useParams } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui/card";
import { useGetCandidates } from "~/features/event/getCandidates";

const CandidateList = () => {
  const { eventId } = useParams();
  const { data } = useGetCandidates({
    eventId: String(eventId),
    queryConfig: {
      enabled: !!eventId,
    },
  });

  return (
    <>
      <h2 className="text-2xl font-semibold mb-4">Candidates</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data?.data
          .sort((a, b) => a.number - b.number)
          .map((candidate, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">
                    Candidate {candidate.number}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Leader</p>
                  <p className="font-semibold">{candidate.leader.name}</p>
                </div>

                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Vice Leader</p>
                  <p className="font-semibold">{candidate.viceLeader.name}</p>
                </div>

                <Separator />
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">
                    Vision & Mission
                  </p>
                  <p className="text-sm leading-relaxed">
                    {candidate.visionMission}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>
    </>
  );
};

export default CandidateList;

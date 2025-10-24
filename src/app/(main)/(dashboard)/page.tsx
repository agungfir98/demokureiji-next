"use client";
// import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
// import { Button } from "~/components/ui/button";
// import { Badge } from "~/components/ui/badge";
import {
  Building2,
  Vote,
  // Clock,
  // CheckCircle2,
  // ChevronRight,
  AlertCircle,
  Calendar,
  TrendingUp,
} from "lucide-react";
import { useGetUserOrg } from "~/features/org";

const Dashboard = () => {
  // const { data: stats } = orgService.GetDashboardStats();
  // const { data: activePollsData } = orgService.GetActivePolls({ limit: 10 });
  const { data: orgs } = useGetUserOrg();

  // const pendingPolls = activePollsData?.events?.filter((e: any) => !e.hasVoted) || [];
  // const votedPolls = activePollsData?.events?.filter((e: any) => e.hasVoted) || [];

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight mb-2">Home</h1>
        <p className="text-lg text-muted-foreground">
          Your voting activities and organization memberships
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              My Organizations
            </CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{orgs?.data?.length || 0}</div>
            <p className="text-xs text-muted-foreground">Active memberships</p>
          </CardContent>
        </Card>

        <Card className="border-orange-200 bg-orange-50/50 dark:border-orange-900 dark:bg-orange-950/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Votes</CardTitle>
            <AlertCircle className="h-4 w-4 text-orange-600 dark:text-orange-400" />
          </CardHeader>
          <CardContent>
            {/* <div className="text-2xl font-bold text-orange-600 dark:text-orange-400"> */}
            {/*   {pendingPolls.length} */}
            {/* </div> */}
            <p className="text-xs text-muted-foreground">Awaiting your vote</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Participation</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {/* <div className="text-2xl font-bold"> */}
            {/*   {stats?.participationRate || 0}% */}
            {/* </div> */}
            {/* <p className="text-xs text-muted-foreground"> */}
            {/*   {stats?.totalVotes || 0} votes cast */}
            {/* </p> */}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-orange-200 dark:border-orange-900">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                    Action Required
                  </CardTitle>
                  <CardDescription className="mt-1.5">
                    Polls waiting for your vote
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* {pendingPolls.length === 0 ? ( */}
              {/*   <div className="text-center py-12"> */}
              {/*     <div className="rounded-full bg-green-100 dark:bg-green-950 p-3 w-fit mx-auto mb-3"> */}
              {/*       <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" /> */}
              {/*     </div> */}
              {/*     <p className="text-sm font-medium mb-1">All caught up!</p> */}
              {/*     <p className="text-xs text-muted-foreground"> */}
              {/*       You've voted in all active polls */}
              {/*     </p> */}
              {/*   </div> */}
              {/* ) : ( */}
              {/* <div className="space-y-3"> */}
              {/* {pendingPolls.map((event: any) => ( */}
              {/*   <Link */}
              {/*     key={event._id} */}
              {/*     href={`/org/${event.orgId}/event/${event._id}/vote`} */}
              {/*     className="block group" */}
              {/*   > */}
              {/*     <div className="flex items-center justify-between p-4 rounded-lg border border-orange-200 dark:border-orange-900 bg-orange-50/50 dark:bg-orange-950/20 hover:bg-orange-100/50 dark:hover:bg-orange-950/30 transition-colors"> */}
              {/*       <div className="flex items-center gap-3 min-w-0 flex-1"> */}
              {/*         <div className="rounded-md bg-orange-600/10 dark:bg-orange-400/10 p-2"> */}
              {/*           <Vote className="h-5 w-5 text-orange-600 dark:text-orange-400" /> */}
              {/*         </div> */}
              {/*         <div className="min-w-0 flex-1"> */}
              {/*           <p className="font-semibold text-sm truncate mb-0.5"> */}
              {/*             {event.voteTitle} */}
              {/*           </p> */}
              {/*           <p className="text-xs text-muted-foreground truncate"> */}
              {/*             {event.organizationName} */}
              {/*           </p> */}
              {/*           {event.endDate && ( */}
              {/*             <p className="text-xs text-orange-600 dark:text-orange-400 mt-1 flex items-center gap-1"> */}
              {/*               <Clock className="h-3 w-3" /> */}
              {/*               Ends {new Date(event.endDate).toLocaleDateString()} */}
              {/*             </p> */}
              {/*           )} */}
              {/*         </div> */}
              {/*       </div> */}
              {/*       <Button size="sm" className="ml-3 gap-1"> */}
              {/*         Vote Now */}
              {/*         <ChevronRight className="h-4 w-4" /> */}
              {/*       </Button> */}
              {/*     </div> */}
              {/*   </Link> */}
              {/* ))} */}
              {/*   </div> */}
              {/* )} */}
            </CardContent>
          </Card>

          {/* {votedPolls.length > 0 && ( */}
          {/*   <Card> */}
          {/*     <CardHeader> */}
          {/*       <CardTitle className="flex items-center gap-2"> */}
          {/*         <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" /> */}
          {/*         Already Voted */}
          {/*       </CardTitle> */}
          {/*       <CardDescription className="mt-1.5"> */}
          {/*         Active polls you've participated in */}
          {/*       </CardDescription> */}
          {/*     </CardHeader> */}
          {/*     <CardContent> */}
          {/*       <div className="space-y-2"> */}
          {/*         {votedPolls.map((event: any) => ( */}
          {/*           <Link */}
          {/*             key={event._id} */}
          {/*             href={`/org/${event.orgId}/event/${event._id}`} */}
          {/*             className="block group" */}
          {/*           > */}
          {/*             <div className="flex items-center justify-between p-3 rounded-lg hover:bg-accent transition-colors"> */}
          {/*               <div className="flex items-center gap-3 min-w-0 flex-1"> */}
          {/*                 <div className="rounded-md bg-green-100 dark:bg-green-950 p-2"> */}
          {/*                   <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" /> */}
          {/*                 </div> */}
          {/*                 <div className="min-w-0 flex-1"> */}
          {/*                   <p className="font-medium text-sm truncate"> */}
          {/*                     {event.voteTitle} */}
          {/*                   </p> */}
          {/*                   <p className="text-xs text-muted-foreground truncate"> */}
          {/*                     {event.organizationName} */}
          {/*                   </p> */}
          {/*                 </div> */}
          {/*               </div> */}
          {/*               <div className="flex items-center gap-2 ml-2"> */}
          {/*                 <Badge variant="secondary" className="text-xs"> */}
          {/*                   <CheckCircle2 className="h-3 w-3 mr-1" /> */}
          {/*                   Voted */}
          {/*                 </Badge> */}
          {/*                 <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-0.5 transition-transform" /> */}
          {/*               </div> */}
          {/*             </div> */}
          {/*           </Link> */}
          {/*         ))} */}
          {/*       </div> */}
          {/*     </CardContent> */}
          {/*   </Card> */}
          {/* )} */}
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                My Organizations
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* {orgs?.organization?.length === 0 ? ( */}
              {/*   <div className="text-center py-8"> */}
              {/*     <div className="rounded-full bg-muted p-3 w-fit mx-auto mb-3"> */}
              {/*       <Building2 className="h-6 w-6 text-muted-foreground" /> */}
              {/*     </div> */}
              {/*     <p className="text-sm text-muted-foreground mb-3"> */}
              {/*       Not part of any organization yet */}
              {/*     </p> */}
              {/*     <Button size="sm" variant="outline"> */}
              {/*       Join Organization */}
              {/*     </Button> */}
              {/*   </div> */}
              {/* ) : ( */}
              {/*   <div className="space-y-2"> */}
              {/*     {orgs?.organization?.slice(0, 6).map((org: any) => ( */}
              {/*       <Link */}
              {/*         key={org._id} */}
              {/*         href={`/org/${org._id}`} */}
              {/*         className="block group" */}
              {/*       > */}
              {/*         <div className="flex items-center justify-between p-2 rounded-md hover:bg-accent transition-colors"> */}
              {/*           <div className="flex items-center gap-2 min-w-0 flex-1"> */}
              {/*             <Building2 className="h-4 w-4 text-muted-foreground flex-shrink-0" /> */}
              {/*             <span className="text-sm font-medium truncate"> */}
              {/*               {org.organization} */}
              {/*             </span> */}
              {/*           </div> */}
              {/*           <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-0.5 transition-transform flex-shrink-0" /> */}
              {/*         </div> */}
              {/*       </Link> */}
              {/*     ))} */}
              {/*     {orgs?.organization?.length > 6 && ( */}
              {/*       <Link href="/organizations"> */}
              {/*         <Button variant="ghost" size="sm" className="w-full mt-2"> */}
              {/*           View All */}
              {/*         </Button> */}
              {/*       </Link> */}
              {/*     )} */}
              {/*   </div> */}
              {/* )} */}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Your Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="space-y-0.5">
                  <p className="text-xs text-muted-foreground">Total Votes</p>
                  {/* <p className="text-2xl font-bold">{stats?.totalVotes || 0}</p> */}
                </div>
                <Vote className="h-8 w-8 text-muted-foreground opacity-50" />
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="space-y-0.5">
                  <p className="text-xs text-muted-foreground">Events Joined</p>
                  {/* <p className="text-2xl font-bold">{stats?.eventsParticipated || 0}</p> */}
                </div>
                <Calendar className="h-8 w-8 text-muted-foreground opacity-50" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

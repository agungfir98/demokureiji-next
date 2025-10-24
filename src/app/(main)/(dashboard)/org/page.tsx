"use client";
import { Building2, ChevronRight, Users } from "lucide-react";
import Link from "next/link";
import { Badge } from "~/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { useGetUserOrg } from "~/features/org";

const Organizations = () => {
  const { data } = useGetUserOrg();

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight mb-2">
          My Organizations
        </h1>
        <p className="text-lg text-muted-foreground">
          View and manage your organization memberships
        </p>
      </div>

      {!data?.data.length && (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="rounded-full bg-muted p-4 mb-4">
              <Building2 className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No organizations yet</h3>
            <p className="text-sm text-muted-foreground text-center max-w-sm">
              You are currently not part of any organization. Join or create one
              to get started.
            </p>
          </CardContent>
        </Card>
      )}

      {data && data.data.length > 0 && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {data.data.map((item) => (
            <Link
              key={item.organization.id}
              href={`/org/${item.organization.id}`}
              className="group block h-full"
            >
              <Card className="h-full hover:shadow-lg transition-all duration-200 hover:scale-[1.02] hover:border-primary/50">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="rounded-lg bg-primary/10 p-2 group-hover:bg-primary/20 transition-colors">
                      <Building2 className="h-5 w-5 text-primary" />
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                  </div>
                  <CardTitle className="line-clamp-1 group-hover:text-primary transition-colors">
                    {item.organization.name}
                  </CardTitle>
                  <CardDescription className="line-clamp-2 mt-1.5">
                    {item.organization.description || "No description provided"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    {item.totalMembers !== undefined && (
                      <div className="flex items-center gap-1.5">
                        <Users className="h-3.5 w-3.5" />
                        <span>{item.totalMembers} members</span>
                      </div>
                    )}
                    {item.userRole && (
                      <Badge variant="secondary" className="text-xs capitalize">
                        {item.userRole}
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Organizations;

"use client";
import Link from "next/link";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { orgService } from "~/services/orgService";

const Organizations = () => {
  const { data } = orgService.getOrganizations();

  return (
    <div className="grid gap-8">
      <h1 className="text-xl font-semibold">organization</h1>
      {data?.data.data?.organization.length === 0 && (
        <div className="opacity-65 w-fit mx-auto my-10">
          You are currently not part of any organization
        </div>
      )}
      <ul className="grid gap-4">
        {data?.data.data?.organization.map((org, index) => (
          <li key={index}>
            <Link href={`/org/${org._id}`} className="h-fit w-fit">
              <Card className="h-20 hover:bg-secondary">
                <CardHeader>
                  <CardTitle>{org.organization}</CardTitle>
                  <CardDescription>{org.description}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Organizations;

import { useMutation, useQuery } from "@tanstack/react-query";
import { axiosInstance } from "~/lib/api/api";
import { IOrganization, IUser } from "~/type/httpResponse";
import { NewOrgType } from "~/type/org";
import { MutationOptions, QueryOptions } from "~/type/react-query";

export const orgService = {
  getOrganizations(options?: QueryOptions<IUser<IOrganization>>) {
    return useQuery({
      ...options,
      queryKey: ["organization"],
      queryFn() {
        return axiosInstance.get("/org");
      },
      refetchOnWindowFocus: false,
    });
  },

  newOrganization(options?: MutationOptions<NewOrgType>) {
    return useMutation({
      ...options,
      mutationFn(data) {
        return axiosInstance.post("/org/new", data);
      },
    });
  },
};

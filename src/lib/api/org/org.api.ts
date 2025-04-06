import { isAxiosError } from "axios";
import { UserOrgs } from "~/type/httpResponse";
import { NewOrgType, OrgMemberQueryType } from "~/type/org";
import { PaginationQueryType } from "~/type/query";
import { axiosInstance } from "../api";

class OrgApi {
  newOrg(data: NewOrgType) {
    return axiosInstance.post("/org/new", data);
  }

  async getUserOrg() {
    try {
      const data = await axiosInstance.get<UserOrgs>("/org");
      return data.data.data;
    } catch (error) {
      if (isAxiosError(error)) {
        switch (error.status) {
          case 404:
            console.log({ status: error.status, data: error.response?.data });
          default:
            throw error;
        }
      }
      throw error;
    }
  }

  getSingleOrg(orgId: string) {
    return axiosInstance.get(`/org/${orgId}`);
  }

  getOrgMembers(orgId: string, params: OrgMemberQueryType) {
    return axiosInstance.get(`/org/${orgId}/members`, {
      params: { ...params },
    });
  }

  getOrgEvents(orgId: string, params: PaginationQueryType) {
    return axiosInstance.get(`/org/${orgId}/events`, {
      params: { ...params },
    });
  }

  newMember({ orgId, userId }: { userId: string; orgId: string }) {
    return axiosInstance.post(`/org/${orgId}/member/add`, { id: userId });
  }

  kickMember({ orgId, userId }: { userId: string; orgId: string }) {
    return axiosInstance.delete(`/org/${orgId}/member/${userId}`);
  }

  demoteAdmin({ orgId, userId }: { userId: string; orgId: string }) {
    return axiosInstance.put(`/org/${orgId}/admin/${userId}`);
  }

  promoteMember({ orgId, userId }: { userId: string; orgId: string }) {
    return axiosInstance.post(`/org/${orgId}/admin/add`, { userId });
  }
}

const orgApi = new OrgApi();
export default orgApi;

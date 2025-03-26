import {
    NewOrgType,
    OrgMemberQueryType,
    PaginationQueryType,
} from "~/type/org";
import { axiosInstance } from "../api";

class OrgApi {
  newOrg(data: NewOrgType) {
    return axiosInstance.post("/org/new", data);
  }

  getOrg() {
    return axiosInstance.get("/org");
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

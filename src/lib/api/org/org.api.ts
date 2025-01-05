import { NewOrgType } from "~/type/org";
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

  newMember({ orgId, userId }: { userId: string; orgId: string }) {
    return axiosInstance.post(`/org/${orgId}/new-member`, { id: userId });
  }
}

const orgApi = new OrgApi();
export default orgApi;

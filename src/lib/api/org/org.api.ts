import { NewOrgType } from "~/type/org";
import { axiosInstance } from "../api";

class OrgApi {
  newOrg(data: NewOrgType) {
    return axiosInstance.post("/org/new", data);
  }
}

const orgApi = new OrgApi();
export default orgApi;

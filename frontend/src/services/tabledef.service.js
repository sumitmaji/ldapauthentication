import apiClient from "../helpers/apiClient";

class TableDefService {
	getAllTableDef = () => apiClient().get("api/table/def");
}

export default new TableDefService();
import apiClient from "../helpers/apiClient";

class TableSchemaService {
	getAllTableSchema = () => apiClient().get("api/table/load");
}

export default new TableSchemaService();
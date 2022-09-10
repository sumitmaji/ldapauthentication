import apiClient from "../helpers/apiClient";

class LicensesService {
	getAllLicenses = () => apiClient().get("licenses");
}

export default new LicensesService();
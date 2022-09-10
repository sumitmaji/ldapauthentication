import LicensesService from "../../../services/licenses.service"
import actions from "./licenses.actions";
import {showLoading, hideLoading} from "../../../loading/LoadingRedux"

export const loadLicensesAsync = () => (dispatch) => {
	dispatch(actions.licensesLoadStart());
	dispatch(showLoading());


	LicensesService.getAllLicenses()
		.then((response) => {

			dispatch(actions.licensesLoadSuccess(response.data._embedded.licenses))
			dispatch(hideLoading())
		})
		.catch((error) => {
			dispatch(actions.licensesLoadError(error.message))
			dispatch(hideLoading())
		});
};
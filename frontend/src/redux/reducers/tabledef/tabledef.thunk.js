import TableDefService from "../../../services/tabledef.service"
import actions from "./tabledef.actions";
import {showLoading, hideLoading} from "../../../loading/LoadingRedux"
import _ from "lodash"

export const loadTableDefAsync = () => (dispatch) => {
	dispatch(actions.tableDefLoadStart());
	dispatch(showLoading());

	TableDefService.getAllTableDef()
		.then((response) => {
			
			dispatch(actions.tableDefLoadSuccess(response.data))
			dispatch(hideLoading())
		})
		.catch((error) => {
			dispatch(actions.tableDefLoadError(error.message))
			dispatch(hideLoading())
		});
};
import TableSchemaService from "../../../services/tableschema.service"
import actions from "./tableschema.actions";
import {showLoading, hideLoading} from "../../../loading/LoadingRedux"
import _ from "lodash"

export const loadTableSchemaAsync = () => (dispatch) => {
	dispatch(actions.tableSchemaLoadStart());
	dispatch(showLoading());

	TableSchemaService.getAllTableSchema()
		.then((response) => {

			//Transformation
			
			const data = _.chain(response.data).mapKeys("name").mapValues(o => {
				return {...o.columns}
			}).value();
			
			dispatch(actions.tableSchemaLoadSuccess(data))
			dispatch(hideLoading())
		})
		.catch((error) => {
			dispatch(actions.tableSchemaLoadError(error.message))
			dispatch(hideLoading())
		});
};
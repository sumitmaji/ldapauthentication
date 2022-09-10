import LicensesReducer from "./licenses/licenses.reducers";
import tableDefReducer from "./tabledef/tabledef.reducers";
import TableSchemaReducer from "./tableschema/tableschema.reducers"

export default {
    licenses: LicensesReducer,
    tableSchema: TableSchemaReducer,
    tableDef: tableDefReducer
};
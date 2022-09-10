import actionTypes from "./tabledef.actionTypes"

const tableDefLoadStart = () => ({
    type: actionTypes.TABLEDEF_LOAD_START
})

const tableDefLoadSuccess = (tableDef) => ({
    type: actionTypes.TABLEDEF_LOAD_SUCCESS,
    payload: tableDef
})

const tableDefLoadError  = (errorMessage) => ({
    type: actionTypes.TABLEDEF_LOAD_ERROR,
    payload: errorMessage
})

export default {
    tableDefLoadStart,
    tableDefLoadSuccess,
    tableDefLoadError
}
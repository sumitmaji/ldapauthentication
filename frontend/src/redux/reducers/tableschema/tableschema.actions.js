import actionTypes from "./tableschema.actionTypes"

const tableSchemaLoadStart = () => ({
    type: actionTypes.TABLESCHEMA_LOAD_START
})

const tableSchemaLoadSuccess = (tableSchema) => ({
    type: actionTypes.TABLESCHEMA_LOAD_SUCCESS,
    payload: tableSchema
})

const tableSchemaLoadError  = (errorMessage) => ({
    type: actionTypes.TABLESCHEMA_LOAD_ERROR,
    payload: errorMessage
})

export default {
    tableSchemaLoadStart,
    tableSchemaLoadSuccess,
    tableSchemaLoadError
}
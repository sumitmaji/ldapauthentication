import actionTypes from "./licenses.actionTypes"

const licensesLoadStart = () => ({
    type: actionTypes.LICENSES_LOAD_START
})

const licensesLoadSuccess = (licenses) => ({
    type: actionTypes.LICENSES_LOAD_SUCCESS,
    payload: licenses
})

const licensesLoadError  = (errorMessage) => ({
    type: actionTypes.LICENSES_LOAD_ERROR,
    payload: errorMessage
})

export default {
    licensesLoadStart,
    licensesLoadSuccess,
    licensesLoadError
}
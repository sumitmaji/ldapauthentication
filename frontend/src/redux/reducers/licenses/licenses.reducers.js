import actionTypes from "./licenses.actionTypes"
import initialStates from "./licenses.initialStates"

const licensesReducer = (state = initialStates, {type, payload}) => {
    switch(type){
        case actionTypes.LICENSES_LOAD_START:
            return {
                ...state,
                isLoading: true,
                data: null,
                errorMessage: null
            };
        case actionTypes.LICENSES_LOAD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: payload,
                errorMessage: null
            };
        case actionTypes.LICENSES_LOAD_ERROR:
            return {
                ...state,
                isLoading: false,
                data: null,
                errorMessage: payload
            };
        default:
            return state;
    }
};

export default licensesReducer;
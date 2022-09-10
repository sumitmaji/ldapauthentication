import actionTypes from "./tableschema.actionTypes"
import initialStates from "./tableschema.initialStates"

const tableSchemaReducer = (state = initialStates, {type, payload}) => {
    switch(type){
        case actionTypes.TABLESCHEMA_LOAD_START:
            return {
                ...state,
                isLoading: true,
                data: null,
                errorMessage: null
            };
        case actionTypes.TABLESCHEMA_LOAD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: payload,
                errorMessage: null
            };
        case actionTypes.TABLESCHEMA_LOAD_ERROR:
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

export default tableSchemaReducer;
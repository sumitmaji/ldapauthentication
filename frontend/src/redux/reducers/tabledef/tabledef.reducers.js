import actionTypes from "./tabledef.actionTypes"
import initialStates from "./tabledef.initialStates"

const tableDefReducer = (state = initialStates, {type, payload}) => {
    switch(type){
        case actionTypes.TABLEDEF_LOAD_START:
            return {
                ...state,
                isLoading: true,
                data: null,
                errorMessage: null
            };
        case actionTypes.TABLEDEF_LOAD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: payload,
                errorMessage: null
            };
        case actionTypes.TABLEDEF_LOAD_ERROR:
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

export default tableDefReducer;
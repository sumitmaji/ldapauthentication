export function getCommonReducers(actionType) {
    return (state = {}, action) => {
        const {type, payload} = action;
        if(type == actionType){
            return {...state, ...payload}
        }

        return state;
    }
}
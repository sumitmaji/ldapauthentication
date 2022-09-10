import { LIST, UPDATE, ADD, DELETE, LOAD, REFRESH } from "./restConstants";

export function restReducer(state = {}, action){
    const {meta ={}, type = '' } = action
    if(type.split('::').length === 3 && type.startsWith('REST')){
        const stateSliceName = type.split('::')[1]
        const stateSlice = state[stateSliceName] || initialState //check this
        const {error, payload} = action
        const {sequence, id, keyField, pageNo} = meta
        const restAction = type.split('::')[2]

        if(error){
            return{
                ...state, [stateSliceName]:{
                    ...stateSlice, error: payload, loading: false
                }
            }
        }

        if(restAction === ADD || restAction === DELETE || restAction === UPDATE || restAction === LOAD){
            delete meta.params
        }

        if(sequence === 'start'){
            return {
                ...state, [stateSliceName]: {
                    ...stateSlice, ...meta, loading: true
                }
            }
        }

        const {data: oldData= []} = stateSlice
        let newData = payload.data
        if(!Array.isArray(newData)){
            newData = [newData]
        }

        if(LIST === restAction && meta.paginationType === 'scroll' && pageNo>1){
            newData = oldData.concat(newData)
        }

        let updateMap
        let deleteKeys
        if(keyField){
            switch(restAction){
                case ADD:
                    newData = [...newData, ...oldData]
                    break
                case LOAD:
                    updateMap = newData.reduce((map, item) => {
                        map[item[keyField]] = item
                        return map
                    }, {})
                    newData = oldData.map(item => {
                        const key = item[keyField]
                        const newVal = updateMap[key]
                        if(newVal){
                            delete (updateMap[key])
                            return newVal
                        }
                        return item
                    })
                    Object.keys(updateMap).forEach(key => {
                        newData.push(updateMap[key])
                    })
                    break
                case UPDATE:
                    updateMap = newData.reduce((map, item) =>{
                        map[item[keyField]] = item
                        return map
                    }, {})
                    newData = oldData.map(item => {
                        const key = item[keyField]
                        return updateMap[key] || item
                    })
                    break
                case DELETE:
                    deleteKeys = newData.map(item => item[keyField])
                    newData = oldData.filter(item => deleteKeys.indexOf(item[keyField]) === -1)
                    break
                default:
                    break
            }
        }
        meta.actionType = restAction

        let newSliceData = {...stateSlice, error: false, loading: false, data: newData, ...meta}
        if(payload.totalCount){
            newSliceData.totalCount = payload.totalCount
        }
        return {...state, [stateSliceName]: newSliceData}
    }
    return state
}

const initialState = {
    data: [],
    params: {},
    loading: false,
    error: false
}
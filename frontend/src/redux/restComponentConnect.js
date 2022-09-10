import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import { REST_SERVICE } from './restMiddleware'
import { LOAD, UPDATE, ADD, DELETE, LOADONCE,
    LIST, CLEAR, REFRESH, REST_REDUCER_KEY
 } from './restConstants'

 const initData = {data: []}

 export default function (restServiceMapping, columns, keyField, url, componentId = restServiceMapping, pageSize, paginationType, option){
     let dateFields = []
     let dateFormats = []
     let dateTimeFields = []
     let dateTimeFormats = []
     let bigDecimalFields = []
     let keyColumns = []

     if(columns && columns.length > 0){
         dateFields = columns.filter(col => col.dataType === 'date').map(col => col.dataKey)
         dateFormats = columns.filter(col => col.dataType === 'date').map(col => col.format || col.dateFormat ? col.format || col.dateFormat : '')
         dateTimeFields = columns.filter(col => col.dataType === 'datetime').map(col => col.dataKey)
         dateTimeFormats = columns.filter(col => col.dataType === 'datetime').map(col => col.format || col.dateFormat ? col.format || col.dateFormat : '')
         bigDecimalFields = columns.filter(col => col.datatype === 'bigdecimal').map(col => col.dataKey)
         keyColumns = columns.filter(col => col.iskey)
         
     }

     let uniqueKeyField = keyField
     if(!uniqueKeyField && keyColumns.length > 0){
         uniqueKeyField = keyColumns[0].dataKey
     }

     const dateAndBigDecimalFields = {dateFormats, dateFormats, dateTimeFields, dateTimeFormats, bigDecimalFields}
     const metadata = {restServiceMapping, keyField: uniqueKeyField, dateAndBigDecimalFields, url, pageSize, paginationType, option}

     const actionCreators = {
         load: (params = {}, path = "") => {
             return {
                 type: `REST::${componentId}::${LOAD}`,
                 method: 'GET',
                 path: path,
                 meta: {
                     params,
                     ...metadata
                 }
             }
         },

         update: (params = {}, path = "") => {
             return {
                type: `REST::${componentId}::${UPDATE}`,
                method: 'PUT',
                path: path,
                meta: {
                    params,
                    ...metadata
                }
            }
         },

         delete: (params = {}, path = "") => {
            return {
               type: `REST::${componentId}::${DELETE}`,
               method: 'DELETE',
               path: path,
               meta: {
                   params,
                   ...metadata
               }
           }
        },

        add: (params = {}, path = "") => {
            return {
               type: `REST::${componentId}::${ADD}`,
               method: 'POST',
               path: path,
               meta: {
                   params,
                   ...metadata
               }
           }
        },

        refresh: (params = {}, path = "") => {
            return {
               type: `REST::${componentId}::${REFRESH}`,
               method: 'GET',
               path: path,
               meta: {
                   params,
                   ...metadata
               }
           }
        },

        list: (params = {}, path = "") => {
            return {
               type: `REST::${componentId}::${LIST}`,
               method: 'GET',
               path: path,
               meta: {
                   params,
                   ...metadata
               }
           }
        },

        loadOnce: (params = {}, path = "") => {
            return {
               type: `REST::${componentId}::${LOADONCE}`,
               method: 'GET',
               path: path,
               meta: {
                   params,
                   ...metadata
               }
           }
        },

        clear: (params = {}, path = "") => {
            return {
               type: `REST::${componentId}::${CLEAR}`,
               method: 'GET',
               path: path,
               payload: {data: []},
               meta: {
                sequence: 'complete', keyField: uniqueKeyField
               }
           }
        },

        localAdd: (params = {}) => {
            return {
               type: `REST::${componentId}::${ADD}`,
               payload: {data: params},
               meta: {
                sequence: 'complete', keyField: uniqueKeyField
               }
           }
        },

        localDelete: (params = {}) => {
            return {
               type: `REST::${componentId}::${DELETE}`,
               payload: {data: params},
               meta: {
                sequence: 'complete', keyField: uniqueKeyField
               }
           }
        },

        localUpdate: (params = {}) => {
            return {
               type: `REST::${componentId}::${UPDATE}`,
               payload: {data: params},
               meta: {
                sequence: 'complete', keyField: uniqueKeyField
               }
           }
        },

        localList: (params = {}) => {
            return {
               type: `REST::${componentId}::${LIST}`,
               payload: {data: params},
               meta: {
                sequence: 'complete', keyField: uniqueKeyField
               }
           }
        }
     }

     const componentActions = `${componentId}Actions`

     const mapStateToProps = (state) => {
         return {
            [componentId]: state[REST_REDUCER_KEY][componentId] || initData
         }
     }

     const mapDispatchToProps = (dispatch) => {
         return {
             [componentActions]: bindActionCreators(actionCreators, dispatch),
             dispatch
         }
     }

     return function connectComp(ConnectedComponent){
        return connect(mapStateToProps, mapDispatchToProps)(ConnectedComponent)
     }
 }
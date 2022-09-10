import { parseData, getEncodeedParams } from "./restFormatter";
import { LIST, REFRESH, LOADONCE, 
LOAD, UPDATE, ADD, DELETE, REST_REDUCER_KEY } from "./restConstants";
import { defaultCheckSessionTimeout } from "./common";
import _ from "lodash"

export const REST_SERVICE = Symbol('REST_SERVICE')

function callRestService(params, url, dateFields, dateTimeFields, dateTimeFormats, bigDecimalFields,
    next, customHeaders={}, checkSessionTimeout, dateFormats, errorHandlers, methd){
        const headers = {
            Accept: 'application/json',
            'Content-type': 'application/json',
            ...customHeaders
        }




        return fetch(url,
            {
                method: methd,
                headers,
                ...(methd != 'GET' && {body: JSON.stringify(params)}),
                credentials: 'include',
                mode: 'cors'
            })
            .then(response => {
                const originalResponse = response.clone()
                const contentType = response.headers.get('content-type')
                const totalCount = response.headers.get('total-count')

                if((response.status === 200 ||
                    response.status === 201 ||
                    response.status === 204 ||
                    response.status === 205) && !contentType){
                        return {data: []}
                }

                if(contentType && contentType.includes('application/json')){
                    return response.json().then(json => {
                        if(!response.ok){
                            return Promise.reject(json)
                        }

                        let data = []
                        if(json){
                            data = parseData(json, dateFields, dateTimeFields, dateTimeFormats,
                                bigDecimalFields, dateFormats)
                        }
                        const err = json.success === undefined ? null : {errorMsg: json.errorMsg}
                        if(err){
                            return Promise.reject(err)
                        }
                        return {data, totalCount}
                    })
                }
                let errorMessage
                if(contentType && contentType.startsWith('text/html')){
                    response.text().then(html => {
                        if(defaultCheckSessionTimeout(html) || checkSessionTimeout(html)){
                            window.location.reload(true)
                        } else {
                            errorMessage = 'JSON expected but HTML received'
                            if(errorHandlers){
                                errorHandlers(originalResponse)
                            } else {
                                //Alert Banner
                            }

                            return Promise.reject({errorMsg: errorMessage})
                        }
                    })
                } else {
                    errorMessage = 'Server response error (JSON expected)'
                    if(errorHandlers){
                        errorHandlers(originalResponse)
                    } else {
                        //Aler banner
                    }

                    return Promise.reject({errorMsg: errorMessage})
                }



            })
    }

    const restMiddleware = (contextObject="", checkSessiontimeoutFunc = () => false) => {
        let context, checkSessionTimeout, errorHandlers
        if(typeof contextObject === 'object'){
            ({context, checkSessionTimeout = () => false, errorHandlers} = contextObject)
        } else {
            context = contextObject
            checkSessionTimeout = checkSessiontimeoutFunc
        }

        return store => next => action => {
            const {meta = {}, type = {}, method = {}, path = ""} = action
            const {restServiceMapping, dateAndBigDecimalFields, keyField, pageSize, paginationType, option={}} = meta
            let {url, params={}} = meta

            if(!restServiceMapping){
                return next(action)
            }

            const state = store.getState()

            let restAction = type.split("::")[2]

            const contextWithSlash = context ? (context.startsWith('/') ? context : `/${context}`) : ''
            window.context = contextWithSlash

            if(!url){
                url = `${contextWithSlash}/api/${meta.restServiceMapping}`
                if(path != ""){
                    url = `${url}/${path}`
                }
            }

            const {dateFields, dateFormats, dateTimeFields, dateTimeFormats, bigDecimalFields} = dateAndBigDecimalFields

            restAction = restAction === REFRESH ? LIST : restAction
            if(restAction === LOADONCE && type.indexOf('::' > 0)){
                const path = type.split('::')
                const sliceData = state[REST_REDUCER_KEY] || {}
                const component = sliceData[path[1]]
                if(component && component.data && component.data.length > 0){
                    return Promise.resolve(component)
                    .then(response => next({
                        type,
                        payload: {data: response.data},
                        meta: {...meta, sequence: 'complete', responseTime: 0}
                    }))
                }
                restAction = LIST
            }

            const requestAction = {
                type,
                meta: {...meta, sequence: 'start', error: false, loading: false}
            }

            next(requestAction)
            
            let pageNo
            switch(restAction){
                case LIST: url += ''
                if(params.$CDT4_pageNo > 1){
                    url = `${url}?pageNo=${params.$CDT4_pageNo}&pageSize=${pageSize}`
                    pageNo = params.$CDT4_pageNo
                } else if(pageSize){
                    url = `${url}?pageNo=1&pageSize=${pageSize}`
                    pageNo = 1
                }
                if(params.$CDT4_sortBy){
                    url = `${url}&sorBy=${params.$CDT4_sortBy}`
                }

                if(params.conditions){
                    url = url.replace("", "")
                }

                delete params.$CDT4_pageNo
                delete params.$CDT4_sortBy
                delete params.$CDT4_pageSize

                if(params){
                    let appendedUrl = _.chain(params).keys().reduce((acc, k) => {
                        if(acc == ""){
                            acc = `${k}=${params[k]}`
                        }else {
                            acc = `${acc}&${k}=${params[k]}`
                        }
                        return acc
                    }, "").value()

                    if(appendedUrl != "")
                        url=`${url}?${appendedUrl}`
                }

                break
                case LOAD: 
                    url += ''
                    if(params){
                        let appendedUrl = _.chain(params).keys().reduce((acc, k) => {
                            if(acc == ""){
                                acc = `${k}=${params[k]}`
                            }else {
                                acc = `${acc}&${k}=${params[k]}`
                            }
                            return acc
                        }, "").value()

                        if(appendedUrl != "")
                            url=`${url}?${appendedUrl}`
                    }
                break
                case ADD: url += ''
                break
                case DELETE: url += ''
                break
                case UPDATE: url += ''
                break
                default: 
                    url += ''
                    if(params){
                        let appendedUrl = _.chain(params).keys().reduce((acc, k) => {
                            if(acc == ""){
                                acc = `${k}=${params[k]}`
                            }else {
                                acc = `${acc}&${k}=${params[k]}`
                            }
                            return acc
                        }, "").value()

                        if(appendedUrl != "")
                            url=`${url}?${appendedUrl}`
                    }
            }

            let encodedParams
            if(Array.isArray(params)){
                encodedParams = params.map((param => getEncodeedParams(param, dateFields, dateTimeFields, dateTimeFormats, bigDecimalFields)))
            }else {
                encodedParams = getEncodeedParams(params, dateFields, dateTimeFields, dateTimeFormats, bigDecimalFields)
            }

            return callRestService(encodedParams, url, dateFields, dateTimeFields, dateTimeFormats, bigDecimalFields,
                next, option.headers, checkSessionTimeout, dateFormats, errorHandlers, method)
                .then(
                    response => next({
                        type,
                        payload: response,
                        meta: {...meta, pageNo, sequence: 'complete'}
                    }),
                    errorMsg => next({
                        type,
                        error: true,
                        payload: errorMsg,
                        meta: {...meta, sequence: 'complete'}
                    })
                )
        }
    }

    export default restMiddleware
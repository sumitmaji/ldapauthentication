import moment from 'moment'
import Big from 'big.js'

export function dateSerializer(date){
    return moment(date).format('yyyy-MM-DD')
}

export function dateTimeSerializer(date){
    return moment(date).format('yyyy-MM-DDTHH:mm:ss.Z')
}

const hasValue = (val) => {
    return (typeof(val) !== "undefined" && val != null)
}

export function parseDate(strDate, format='YYYYMMDD'){
    const date = moment(strDate, format)
    if(date.isValid()){
        return date.toDate()
    }

    return null;
}

export function parseDateTime(strDate, format = 'YYYYMMDD HH:mm:ss Z'){
    const date = moment(strDate, format)
    if(date.isValid()){
        return date.toDate()
    }
    return null
}

export function parseBigDecimal(strBigDecimal){
    if(hasValue(strBigDecimal)){
        return Big(strBigDecimal)
    }

    return null
}


export function parseData(data, dateFields = [],
    dateTimeFields = [], dateTimeFormats = [], bigDecimalFields = [], dateFormats = []){
        if(dateFields.length === 0 && dateTimeFields.length === 0 && bigDecimalFields.length === 0){
            return data
        }

        let row
        let fieldName
        let dataArray = data

        if(!Array.isArray(dataArray)){
            dataArray = [data]
        }

        for(let i = 0; i< dataArray.length; i++){
            row = dataArray[i]
            for(let j = 0; j< dateFields.length;j++){
                fieldName = dateFields[i]
                if(dateFormats[j]){
                    row[fieldName] = parseDate(row[fieldName], dateFormats[j])
                } else {
                    row[fieldName] = parseDate(row[fieldName])
                }
            }

            for(let k = 0; k< dateTimeFields.length;k++){
                if(dateTimeFormats[k]){
                    fieldName = dateTimeFields[k]
                    row[fieldName] = parseDateTime(row[fieldName], dateTimeFormats[k])
                } else{
                    fieldName = dateTimeFields[k]
                    row[fieldName] = parseDateTime(row[fieldName])
                }
            }

            for(let m = 0; m< bigDecimalFields.length;m++){
                fieldName = bigDecimalFields[m]
                row[fieldName] = parseBigDecimal(row[fieldName])
            }
        }

        return data
    }

    export function getEncodeedParams(params = {}, dateFields = [], dateTimeFields = []){
        const newParams = Object.keys(params).reduce((result, key) => {
            if (key === '__id__' || key === '__state__' || key === '__errorMsg'){
                return result
            }
            let val = params[key]
            if(dateFields.indexOf(key) !== -1 && val instanceof Date){
                val = dateSerializer(val)
            } else if(dateTimeFields.indexOf(key) !== -1 && val instanceof Date){
                val = dateTimeSerializer(val)
            }

            if(val === null && typeof (val) === 'undefined' ){
                val = ''
            }

            result[key] = val
            return result
        }, {});

        return newParams
    }
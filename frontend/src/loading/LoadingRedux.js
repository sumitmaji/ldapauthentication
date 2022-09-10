export const LOADINGUI = '__ui/LOADING'

export function showLoading(){
    return{
        type: LOADINGUI,
        payload: {show: true}
    }
}

export function hideLoading(){
    return{
        type: LOADINGUI,
        payload: {show: false}
    }
}
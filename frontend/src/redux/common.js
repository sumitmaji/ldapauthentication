export const defaultCheckSessionTimeout = (htlm) => {
    if(htlm.includes("sometext") || htlm.includes("someothertext"))
    return true
    else
    return false
}
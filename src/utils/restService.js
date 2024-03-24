import axios from "axios"

const baseURL = 'https://api.escuelajs.co/api/v1'


export default async function restService(endpoint, subEndpoint, method, header, body) {
    const url = `${baseURL}/${endpoint}/${subEndpoint === undefined ? '' : subEndpoint}`
    return await axios({
        url: url,
        method: method,
        headers: header === undefined || header === '' ? undefined : header,
        data: body === undefined || body === '' ? undefined : body,
    })
    .then(res => {
        return res.data
    })
    .catch(err => {
        throw new Error(err.message)
    })
}









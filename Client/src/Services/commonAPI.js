import axios from 'axios'

export const commonAPI = async (method,url,data,reqHeader) => {
    const reqConfig = {
        method,
        url,
        data,
        headers:reqHeader?reqHeader:{"Content-Type":"application/json"}
    }
    return data = await axios(reqConfig).then((res)=>{
        return res
    }).catch((err)=>{
        return err
    })
}
import axios from 'axios'
const get=(BookName:string)=>{
    return axios.get(`/api/get?BookName=${BookName}`)
}
const add=(req : {}) =>{
    return axios.post('api/add',req)
}
const edit=(req: {}) =>{
    return axios.post('api/edit',req)
}
const del=(id:String)=>{
    return axios.get(`api/del?Id=${id}`)
}
export{
    get,add,edit,del
}
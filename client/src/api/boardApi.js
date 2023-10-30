import axiosClient from './axiosClient';
    
const boardApi = {
    create : (params) => axiosClient.post(`todo`, params),
    update : (boardId, params) => axiosClient.put(`todo/${boardId}`, params),
    delete: (boardId) => axiosClient.delete(`todo/${boardId}`),
    getAll : () => axiosClient.get(`todo`)

}

export default boardApi
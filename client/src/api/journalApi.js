import axiosClient from "./axiosClient"

const journalApi = {
    create : (params) => axiosClient.post(`journal`, params),
    getAll : () => axiosClient.get('journal'),
    delete: (journalId) => axiosClient.delete(`journal/${journalId}`),
    update : (journalId, params) => axiosClient.put(`journal/${journalId}`, params),
    getOne : (journalId) => axiosClient.get(`journal/${journalId}`)

}

export default journalApi

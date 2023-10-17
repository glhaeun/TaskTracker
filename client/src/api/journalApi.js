import axiosClient from "./axiosClient"

const journalApi = {
    create : () => axiosClient.post('board'),
    getAll : () => axiosClient.get('board'),
}

export default journalApi

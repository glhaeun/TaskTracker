import axiosClient from './axiosClient'

const taskApi = {
  create: (boardId, params) => axiosClient.post(`todo/${boardId}/task`, params),
  updatePosition: ( boardId, params) => axiosClient.put(
    `todo/${boardId}/task/update-position`,
    params
  ),
  updateSection: (boardId, params) => axiosClient.put(
    `todo/${boardId}/task/update-section`,
    params
  ),
  delete: (boardId, taskId) => axiosClient.delete(`todo/${boardId}/task/${taskId}`),
  update: (boardId, taskId, params) => axiosClient.put(
    `todo/${boardId}/task/${taskId}`,
    params
  ),
  getAll: (boardId, queryParams) => axiosClient.get(`todo/${boardId}/task`, { params: queryParams }),
  getUpcoming: (boardId) => axiosClient.get(`todo/${boardId}/task/getUpcoming`)
}

export default taskApi
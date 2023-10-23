import axiosClient from "./axiosClient"

const authApi = {
  signup: params => axiosClient.post('auth/register', params),
  login: params => axiosClient.post('auth/login', params),
  verifyToken: () => axiosClient.post('auth/verify-token'),
  forgotPassword: params => axiosClient.post('auth/forgot-password', params),
  getUserForChangePassword: (id, uniqueString) => axiosClient.get(`auth/change-password/${id}/${uniqueString}`),
  changePassword: (id, params) => axiosClient.post(`auth/change-password/${id}`, params)

}

export default authApi

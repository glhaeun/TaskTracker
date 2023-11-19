import axiosClient from "./axiosClient"

const calendarApi = {
    create : (params) => axiosClient.post(`calendar`, params),
    getAll : () => axiosClient.get('calendar'),
    update : (eventId, params) => axiosClient.put(`calendar/${eventId}`, params),
    // getAllExpenses : () => axiosClient.get('budget/expenses'),
    delete: (eventId) => axiosClient.delete(`calendar/${eventId}`),
    // getOne : (budgetId) => axiosClient.get(`budget/${budgetId}`),
    // addExpenses: (budgetId, params) => axiosClient.put(`budget/${budgetId}`, params),
    getOne: (calendarDate) => axiosClient.get(`calendar/${calendarDate}`)
}

export default calendarApi

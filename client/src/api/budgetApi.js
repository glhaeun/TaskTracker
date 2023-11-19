import axiosClient from "./axiosClient"

const budgetApi = {
    create : (params) => axiosClient.post(`budget`, params),
    getAll : () => axiosClient.get('budget'),
    getAllExpenses : () => axiosClient.get('budget/expenses'),
    delete: (budgetId) => axiosClient.delete(`budget/${budgetId}`),
    deleteExpense: (budgetId, expenseId) => axiosClient.delete(`budget/${budgetId}/${expenseId}`),
    getOne : (budgetId) => axiosClient.get(`budget/${budgetId}`),
    addExpenses: (budgetId, params) => axiosClient.put(`budget/${budgetId}`, params),
}

export default budgetApi

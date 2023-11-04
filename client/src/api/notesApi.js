import axiosClient from "./axiosClient"

const notesApi = {
    create : (params) => axiosClient.post(`notes`, params),
    getAll : () => axiosClient.get('notes'),
    getArchived: () => axiosClient.get('notes/archive'),
    getDeleted: () => axiosClient.get('notes/deleted'),
    setPinned: (noteId, params) => axiosClient.put(`notes/${noteId}?action=setPinned`, params),
    setArchive: (noteId, params) => axiosClient.put(`notes/${noteId}?action=setArchive`, params),
    setDelete: (noteId, params) => axiosClient.put(`notes/${noteId}?action=setDelete`, params),
    delete: (noteId) => axiosClient.delete(`notes/${noteId}`),
    update : (noteId, params) => axiosClient.put(`notes/${noteId}/update`, params),

    
}

export default notesApi

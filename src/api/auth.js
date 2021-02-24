import { api, successResponse, failureResponse } from 'utils/api'

export const login = async (data) => {
    try {
        const response = await api.post('/auth/signin', data);
        return successResponse(response.data);
    } catch(error) {
        if(error.response && error.response.code == 400) {
            return failureResponse(error.response.message)
        }
    }
    return failureResponse()
}

export const register = async (data) => {
    try{
        const response = await api.post('/auth/signup', data);
        return successResponse(response.data);
    } catch(error) {
        if(error.response && error.response.code == 400) {
            return failureResponse(error.response.message || '')
        }
    }
    return failureResponse()
}
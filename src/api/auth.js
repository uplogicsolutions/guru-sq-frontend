import { api, successResponse, failureResponse } from 'utils/api'

export const login = async (data) => {
    try {
        const response = await api.post('/auth/signin', data);
        return successResponse(response.data);
    } catch (error) {
        if (error.response && error.response.status == 400) {
            return failureResponse(error.response.data.message)
        }
    }
    return failureResponse()
}

export const register = async (data) => {
    try {
        const response = await api.post('/auth/signup', data);
        localStorage.removeItem('token');
        localStorage.setItem('token', response.data.token);
        return successResponse(response.data);
    } catch (error) {
        console.log(error.response)
        if (error.response && error.response.status == 400) {
            return failureResponse(error.response.data.message)
        }
    }
    return failureResponse()
}

export const registerPersonalDetails = async (data) => {
    try {
        const response = await api.post('/user/user-personal-details', data);
        return successResponse(response.data);
    } catch (error) {
        if (error.response && error.response.status == 400) {
            return failureResponse(error.response.data.message)
        }
    }
    return failureResponse()
}
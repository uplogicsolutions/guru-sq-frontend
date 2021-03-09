import { api, successResponse, failureResponse } from 'utils/api'

export const login = async (data) => {
    try {
        const response = await api.post('/auth/signin', data);
        console.log('Login',response);
        localStorage.removeItem('token');
        localStorage.setItem('token', response.data.token);
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

export const registerSchoolDetails = async (data) => {
    try {
        const response = await api.post('/user/user-school-details', data);
        return successResponse(response.data);
    } catch (error) {
        if (error.response && error.response.status == 400) {
            return failureResponse(error.response.data.message)
        }
    }
    return failureResponse()
}

export const registerSubjectDetails = async (data) => {
    try {
        const response = await api.post('/user/user-subjects', data);
        return successResponse(response.data);
    } catch (error) {
        if (error.response && error.response.status == 400) {
            return failureResponse(error.response.data.message)
        }
    }
    return failureResponse()
}

export const registerEducationalDetails = async (data) => {
    try {
        const response = await api.post('/user/user-education-history', data);
        return successResponse(response.data);
    } catch (error) {
        if (error.response && error.response.status == 400) {
            return failureResponse(error.response.data.message)
        }
    }
    return failureResponse()
}

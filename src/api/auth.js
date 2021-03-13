import { getConfig, successResponse, failureResponse } from 'utils/api'
import axios from 'axios'

export const login = async (data) => {
    try {
        const response = await axios.post('/auth/signin', data, getConfig());
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
        const response = await axios.post('/auth/signup', data, getConfig());
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
        const response = await axios.post('/user/user-personal-details', data, getConfig());
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
        const response = await axios.post('/user/user-school-details', data, getConfig());
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
        const response = await axios.post('/user/user-subjects', data, getConfig());
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
        const response = await axios.post('/user/user-education-history', data, getConfig());
        return successResponse(response.data);
    } catch (error) {
        if (error.response && error.response.status == 400) {
            return failureResponse(error.response.data.message)
        }
    }
    return failureResponse()
}

export const registerProfessionalDetails = async (data) => {
    try {
        const response = await axios.post('/user/user-professional-details', data, getConfig());
        return successResponse(response.data);
    } catch (error) {
        if (error.response && error.response.status == 400) {
            return failureResponse(error.response.data.message)
        }
    }
    return failureResponse()
}

export const checkUser = async () => {
    try {
        const response = await axios.get('/auth/check', getConfig());
        return successResponse(response.data);
    } catch (error) {
        if (error.response && error.response.status >= 400 && error.response.status < 500) {
            return failureResponse(error.response.data.message)
        }
    }
    return failureResponse()
}

export const getUser = async () => {
    try {
        const response = await axios.get('/auth/get', getConfig());
        return successResponse(response.data);
    } catch (error) {
        if (error.response && error.response.status >= 400 && error.response.status < 500) {
            return failureResponse(error.response.data.message)
        }
    }
    return failureResponse()
}
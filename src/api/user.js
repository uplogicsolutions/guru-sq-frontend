import { getConfig, successResponse, failureResponse } from 'utils/api'
import axios from 'axios'

export const getPersonalDetails = async () => {
    try {
        const response = await axios.get(`/user/user-personal-details`, getConfig());
        return successResponse(response.data);
    } catch (error) {
        if (error.response && error.response.code == 400) {
            return failureResponse(error.response.message)
        }
    }
    return failureResponse()
}

export const editPersonalDetails = async (data) => {
    try {
        const response = await axios.put(`/user/user-personal-details`, data, getConfig());
        return successResponse(response.data);
    } catch (error) {
        if (error.response && error.response.code == 400) {
            return failureResponse(error.response.message)
        }
    }
    return failureResponse()
}

export const getSubjects = async () => {
    try {
        const response = await axios.get(`/user/user-subjects`, getConfig());
        return successResponse(response.data);
    } catch (error) {
        if (error.response && error.response.code == 400) {
            return failureResponse(error.response.message)
        }
    }
    return failureResponse()
}

export const editSubjects = async (data) => {
    try {
        const response = await axios.put(`/user/user-subjects`, data, getConfig());
        return successResponse(response.data);
    } catch (error) {
        if (error.response && error.response.code == 400) {
            return failureResponse(error.response.message)
        }
    }
    return failureResponse()
}

export const getSchoolDetails = async () => {
    try {
        const response = await axios.get(`/user/user-school-details`, getConfig());
        return successResponse(response.data);
    } catch (error) {
        if (error.response && error.response.code == 400) {
            return failureResponse(error.response.message)
        }
    }
    return failureResponse()
}

export const editSchoolDetails = async (data) => {
    try {
        const response = await axios.put(`/user/user-school-details`, data, getConfig());
        return successResponse(response.data);
    } catch (error) {
        if (error.response && error.response.code == 400) {
            return failureResponse(error.response.message)
        }
    }
    return failureResponse()
}

export const getUserProfileDetails = async (user_id) => {
    try {
        let config = getConfig()
        const response = await axios.get(`/user/profile`, 
            {   ...config, 
                params: {
                    user_id
                }
            }
        );
        return successResponse(response.data);
    } catch (error) {
        if (error.response && error.response.code == 400) {
            return failureResponse(error.response.message)
        }
    }
    return failureResponse()
}

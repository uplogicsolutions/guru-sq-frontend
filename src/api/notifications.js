import { getConfig, successResponse, failureResponse } from 'utils/api'
import axios from 'axios'

export const get = async () => {
    try {
        const response = await axios.get(`/notifications/`, getConfig());
        return successResponse(response.data);
    } catch (error) {
        if (error.response && error.response.code == 400) {
            return failureResponse(error.response.message)
        }
    }
    return failureResponse()
}

export const read = async () => {
    try {
        const response = await axios.get(`/notifications/read`, getConfig());
        return successResponse(response.data);
    } catch (error) {
        if (error.response && error.response.code == 400) {
            return failureResponse(error.response.message)
        }
    }
    return failureResponse()
}

export const count = async () => {
    try {
        const response = await axios.get(`/notifications/count`, getConfig());
        return successResponse(response.data);
    } catch (error) {
        if (error.response && error.response.code == 400) {
            return failureResponse(error.response.message)
        }
    }
    return failureResponse()
}
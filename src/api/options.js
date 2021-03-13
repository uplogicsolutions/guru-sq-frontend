import { getConfig, successResponse, failureResponse } from 'utils/api'
import axios from 'axios'

export const getOptions = async (type) => {
    try {
        const response = await axios.get(`/options?type=${type}`, getConfig());
        return successResponse(response.data);
    } catch (error) {
        if (error.response && error.response.code == 400) {
            return failureResponse(error.response.message)
        }
    }
    return failureResponse()
}
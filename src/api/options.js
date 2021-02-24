import { api, successResponse, failureResponse } from 'utils/api'
import axios from 'axios'

export const getOptions = async (type) => {
    try {
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                ContentType: 'application/json',
                authorization: 'Bearer ' + token
            }
        }
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/options`, { type }, config);
        return successResponse(response.data);
    } catch (error) {
        if (error.response && error.response.code == 400) {
            return failureResponse(error.response.message)
        }
    }
    return failureResponse()
}
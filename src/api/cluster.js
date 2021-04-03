import { getConfig, successResponse, failureResponse } from 'utils/api'
import axios from 'axios'

export const getUsers = async () => {
    try {
        const response = await axios.get(`/cluster/users`, getConfig());
        return successResponse(response.data);
    } catch (error) {
        if (error.response && error.response.code == 400) {
            return failureResponse(error.response.message)
        }
    }
    return failureResponse()
}

export const getMessages = async () => {
  try {
      const response = await axios.get(`/cluster/getMessages`, getConfig());
      return successResponse(response.data);
  } catch (error) {
      if (error.response && error.response.code == 400) {
          return failureResponse(error.response.message)
      }
  }
  return failureResponse()
}

export const sendMessage = async (data) => {
  try {
      const response = await axios.post(`/cluster/sendMessage`, data, getConfig());
      return successResponse(response.data);
  } catch (error) {
      if (error.response && error.response.code == 400) {
          return failureResponse(error.response.message)
      }
  }
  return failureResponse()
}

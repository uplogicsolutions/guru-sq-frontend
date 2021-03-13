import { getConfig, successResponse, failureResponse } from 'utils/api'
import axios from 'axios'

export const getProfile = async () => {
  try {
    const response = await axios.get('/user/profile', getConfig());
    return successResponse(response.data);
  } catch (error) {
    if (error.response && error.response.status == 400) {
      return failureResponse(error.response.data.message)
    }
  }
  return failureResponse()
}

export const editProfile = async (url, data) => {
  try {
    const response = await axios.put(url, data, getConfig());
    return successResponse(response.data);
  } catch (error) {
    if (error.response && error.response.status == 400) {
      return failureResponse(error.response.data.message)
    }
  }
  return failureResponse()
}

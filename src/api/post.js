import { getConfig, successResponse, failureResponse } from 'utils/api'
import axios from 'axios'

export const get = async () => {
    try {
        const response = await axios.get(`/post/all`, getConfig());
        return successResponse(response.data);
    } catch (error) {
        if (error.response && error.response.code == 400) {
            return failureResponse(error.response.message)
        }
    }
    return failureResponse()
}

export const like = async (data) => {
  try {
      const response = await axios.post(`/post/like`, data, getConfig());
      return successResponse(response.data);
  } catch (error) {
      if (error.response && error.response.code == 400) {
          return failureResponse(error.response.message)
      }
  }
  return failureResponse()
}

export const comment = async (data) => {
  try {
      const response = await axios.post(`/post/comment`, data, getConfig());
      return successResponse(response.data);
  } catch (error) {
      if (error.response && error.response.code == 400) {
          return failureResponse(error.response.message)
      }
  }
  return failureResponse()
}

export const add = async (data) => {
    try {
        const response = await axios.post(`/post/add`, data, getConfig());
        return successResponse(response.data);
    } catch (error) {
        if (error.response && error.response.code == 400) {
            return failureResponse(error.response.message)
        }
    }
    return failureResponse()
}

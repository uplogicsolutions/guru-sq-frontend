import { api, successResponse, failureResponse } from 'utils/api'

export const get = async () => {
    try {
        const response = await api.get(`${process.env.REACT_APP_SERVER_URL}/post/all`);
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
      const response = await api.post(`${process.env.REACT_APP_SERVER_URL}/post/like`, data);
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
      const response = await api.post(`${process.env.REACT_APP_SERVER_URL}/post/comment`, data);
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
        const response = await api.post(`${process.env.REACT_APP_SERVER_URL}/post/add`, data);
        return successResponse(response.data);
    } catch (error) {
        if (error.response && error.response.code == 400) {
            return failureResponse(error.response.message)
        }
    }
    return failureResponse()
}

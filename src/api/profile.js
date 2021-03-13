import { api, successResponse, failureResponse } from 'utils/api'

export const getProfile = async () => {
  try {
    const response = await api.get('/user-profile');
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
    const response = await api.put(url, data);
    return successResponse(response.data);
  } catch (error) {
    if (error.response && error.response.status == 400) {
      return failureResponse(error.response.data.message)
    }
  }
  return failureResponse()
}

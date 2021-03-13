
const getConfig = () => {
    return {
        baseURL: process.env.REACT_APP_SERVER_URL,
        headers: {
            'content-type': 'application/json',
            'authorization': `Bearer ${localStorage.getItem('token')}`
        },
    }
}

const successResponse = (data) => {
    return {
        type: 'success',
        data: data
    }
}

const failureResponse = (message = 'Something went wrong') => {
    if (!!!message) message = 'Something went wrong'
    return {
        type: 'failure',
        message: message
    }
}

export { getConfig, successResponse, failureResponse }
import { SUCCESS, FAILURE,DELETE_FILE_FAILURE, DELETE_FILE_REQUEST, DELETE_FILE_SUCCESS, SAGA_DELETE_FILE_REQUEST } from "../staticVariable"



export const sageDeleteFileMiddleware = (userId , fileId ) => {
    return {
        type : SAGA_DELETE_FILE_REQUEST,
        payload : {
            userId : userId,
            fileId : fileId
        }
    }
}

export const deleteFileRequest = () => {
    return {
        type : DELETE_FILE_REQUEST
    }
}

export const deleteFileSuccess = () => {
    return {
        type : DELETE_FILE_SUCCESS,
        payload : SUCCESS
    }
}

export const deleteFileFailure = () => {
    return {
        type : DELETE_FILE_FAILURE,
        payload : FAILURE
    }
}

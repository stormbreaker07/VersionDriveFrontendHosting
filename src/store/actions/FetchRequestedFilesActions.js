import { FETCH_REQUESTED_FILES_ERROR , FETCH_REQUESTED_FILES_REQUEST, FETCH_REQUESTED_FILES_SUCCESS , SAGA_REQUESTED_FILES_REQUEST} from '../staticVariable';


export const fetchRequestedFileActionRequested = () => {
    return {
        type : FETCH_REQUESTED_FILES_REQUEST,
    }
}

export const fetchRequestedFileActionSuccess = (filesInfo) => {
    return {
        type : FETCH_REQUESTED_FILES_SUCCESS ,
        payload : filesInfo
    }
}

export const fetchRequestedFileActionError = (error) => {
    return {
        type : FETCH_REQUESTED_FILES_ERROR,
        payload : error
    }
}

export const sagaFetchRequestedFileActionRequest = (data) => {
    return {
        type : SAGA_REQUESTED_FILES_REQUEST,
        payload : data
    }
}
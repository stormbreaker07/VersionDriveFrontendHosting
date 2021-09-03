import { FETCH_REQUESTED_FILES_SUCCESS , FETCH_REQUESTED_FILES_REQUEST, FETCH_REQUESTED_FILES_ERROR } from '../staticVariable';


const initialRequestedFileInfoState = {
    loading : false,
    data : [],
    error : ''
}

export const fetchRequestedFileInfoReducer = (state = initialRequestedFileInfoState, action) => {

    switch(action.type) {
        case FETCH_REQUESTED_FILES_REQUEST : return {
            loading : true,
            data : action.payload ,
            error : ''
        }
        case FETCH_REQUESTED_FILES_SUCCESS : return {
            loading : false,
            data : action.payload,
            error : ''
        }
        case FETCH_REQUESTED_FILES_ERROR : return {
            loading : false,
            data : [],
            error : action.payload
        }
        default : return state
    }
} 
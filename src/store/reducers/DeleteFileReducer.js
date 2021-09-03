import { DELETE_FILE_FAILURE, DELETE_FILE_REQUEST, DELETE_FILE_SUCCESS, FAILURE, SUCCESS } from "../staticVariable"

const initialDeleteFileState = {
    loading : false,
    status : ''
}

export const deleteFileReducer = (state = initialDeleteFileState , action) => {

    switch(action.type) {
        case DELETE_FILE_REQUEST : return {
            ...state,
            loading : true,
            status : "loading"
        }
        case DELETE_FILE_SUCCESS : return {
                ...state , 
                loading : false , 
                status : SUCCESS
            }
        case DELETE_FILE_FAILURE : return {
            ...state , 
            loading :  false , 
            status : FAILURE
        }
        default : return {...state}
    }
} 
import { MY_FILES,SHARED_FILES,REQUESTED_FILES } from '../staticVariable'; 

const initialCurrentFileState = {
    location : MY_FILES
}


export const currentFilesReducer = (state = initialCurrentFileState ,action) => {

    switch(action.type) {
        case MY_FILES : return {
            ...state , 
            location : MY_FILES
        }
        case SHARED_FILES : return {
            ...state , 
            location : SHARED_FILES
        }
        case REQUESTED_FILES : return {
            ...state , 
            location : REQUESTED_FILES
        }
        default : return state;
    }
}

import { DELETE_FILE_FROM_STATE, FETCH_MY_FILES_ERROR , FETCH_MY_FILES_REQUEST, FETCH_MY_FILES_SUCCESS } from '../staticVariable';


const initialMyFileInfoState = {
    loading : false,
    data : [],
    error : ''
}


const deleteFIleFromData = (files , deletedfileId) => {
    let resultentfiles = [];
    for(let i =0;i<files.length ; i++) {
        if(files[i].file_id !== deletedfileId) {
            resultentfiles.push(files[i]);
        }
    }

    return resultentfiles;
}

export const fetchMyFileInfoReducer = (state = initialMyFileInfoState, action) => {

    switch(action.type) {
        case FETCH_MY_FILES_REQUEST : return {
            loading : true,
            data : action.payload ,
            error : ''
        }
        case FETCH_MY_FILES_SUCCESS : return {
            loading : false,
            data : action.payload,
            error : ''
        }
        case FETCH_MY_FILES_ERROR : return {
            loading : false,
            data : [],
            error : action.payload
        }
        case DELETE_FILE_FROM_STATE : {
            
            const resultantFiles = deleteFIleFromData(state.data , action.payload);
            
            return {
            loading : false,
            data : resultantFiles,
            error : ''
            }
        }
        default : return state
    }

} 


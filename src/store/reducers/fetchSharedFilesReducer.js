import { DELETE_FILE_FROM_STATE ,FETCH_SHARED_FILES_ERROR , FETCH_SHARED_FILES_REQUEST, FETCH_SHARED_FILES_SUCCESS } from '../staticVariable';


const initialSharedFileInfoState = {
    loading : false,
    data : [],
    error : ''
}

const deleteFileFromData = (files , deletedfileId) => {
    let resultentfiles = [];
    for(let i =0;i<files.length ; i++) {
        if(files[i].fileInfo.file_id !== deletedfileId) {
            resultentfiles.push(files[i]);
        }
    }

    return resultentfiles;
}


export const fetchSharedFileInfoReducer = (state = initialSharedFileInfoState, action) => {

    switch(action.type) {
        case FETCH_SHARED_FILES_REQUEST : return {
            loading : true,
            data : action.payload ,
            error : ''
        }
        case FETCH_SHARED_FILES_SUCCESS : return {
            loading : false,
            data : action.payload,
            error : ''
        }
        case FETCH_SHARED_FILES_ERROR : return {
            loading : false,
            data : [],
            error : action.payload
        }
        case DELETE_FILE_FROM_STATE : {
            console.log("deleteFILeFromSharedFIles" + action.payload)
            const resultantFiles = deleteFileFromData(state.data , action.payload);
            
            return {
            loading : false,
            data : resultantFiles,
            error : ''
            }
        }
        default : return state
    }
} 

import {deleteFileService} from '../../services/filesServices/deleteFileService';


export const deleteFileUtility = (userId , fileId) => {

    return deleteFileService(userId , fileId);
}
import {loadFileService} from '../../services/filesServices/LoadFileService';


export const previewFileUtility = (userId , ownerId ,fileId , callbackFunction) => {
    const promise = loadFileService(userId , ownerId , fileId);
    promise.then((response) => {
        callbackFunction(response.data);
    }
    ).catch((error) => {
        console.log(error.response.message)
    })

}


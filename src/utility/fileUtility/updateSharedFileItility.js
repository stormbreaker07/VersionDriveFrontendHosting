import { updateSharedFile } from "../../services/filesServices/updateSharedFileService";


export const updateSharedFileUtility = (userId , fileVersion ,uploaderId ,  formData , getResponse) => {

    const promise = updateSharedFile(userId , fileVersion ,uploaderId ,  formData);
    promise.then((response) => {
        getResponse('success');
    })
    .catch((error) => {
        alert(error.response.data.message);
        getResponse('failure');
    })
} 
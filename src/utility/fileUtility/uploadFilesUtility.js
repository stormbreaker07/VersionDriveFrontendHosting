import {uploadFile} from '../../services/filesServices/uploadFileService';

export const uploadFileUtility = (userId , fileVersion , formData , getResponse) => {

    const promise = uploadFile(userId , fileVersion , formData);
    promise.then((response) => {
        getResponse('success');
    })
    .catch((error) => {
        alert(error.response.data.message);
        getResponse('failure');
    })
} 
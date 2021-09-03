const axios = require('axios');


export const updateSharedFile = (ownerId , fileVersion , uploaderId ,  formData) => {


    return axios({
        method : 'post',
        url : `http://localhost:8080/shared-file/${ownerId}/upload/${fileVersion}/${uploaderId}` ,
        data : formData,
    })

}
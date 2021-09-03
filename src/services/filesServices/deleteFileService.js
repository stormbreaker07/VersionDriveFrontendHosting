const axios = require('axios');

export const deleteFileService = (userId , fileId) => {

    return axios({
        method : 'get',
        url : `http://localhost:8080/dashboard/${userId}/delete-file/${fileId}`
    })

}
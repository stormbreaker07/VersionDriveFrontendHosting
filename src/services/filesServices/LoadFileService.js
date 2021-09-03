const axios = require('axios');


export const loadFileService = (userId , ownerId , fileId) => {

    return axios({
        method : 'get' , 
        url :  `http://localhost:8080/files/${userId}/download/${fileId}/${ownerId}`,    
    })
}


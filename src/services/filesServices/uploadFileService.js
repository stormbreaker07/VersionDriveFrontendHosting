const axios = require('axios');



export const uploadFile = (userId , fileVersion , formData) => {


    return axios({
        method : 'post',
        url : `http://localhost:8080/files/${userId}/upload/${fileVersion}` ,
        data : formData,
    })

}

const axios = require("axios");

export const fileSharingService = (data) => {

    console.log(data);
    return axios.default({
        method : 'post' ,
        url : `http://localhost:8080/files/${data.ownerId}/share-file`,
        data : data   
    })

}
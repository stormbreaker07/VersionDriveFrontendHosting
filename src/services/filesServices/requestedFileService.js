const axios = require('axios');

export const requestedFileService = (userId) => {

    //const headers = new Headers();
    //headers.append('Accept' , 'application/json');


    return axios({
        method: 'get',
        url: `http://localhost:8080/dashboard/${userId}/requested-files`,
        //headers : headers
    })

}
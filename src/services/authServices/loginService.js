const axios = require('axios');


export const verifyLoginData = (loginData) => {
    
    const headers = new Headers();
    headers.append('content-type' , 'application/json');
    headers.append('Accept' , 'application/json');

    
    return axios({
        method : 'post',
        url : 'http://localhost:8080/signIn',
        data : loginData ,
        headers : headers
    });
}
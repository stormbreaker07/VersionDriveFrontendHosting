const axios = require('axios');

export const verifyRecieversEmailService = (emailId,callBackMethod) => {
    axios({
        method : 'get' , 
        url : `http://localhost:8080/files/verify-email/${emailId}`
    }).then((response) => {
        callBackMethod(response);
    })
    .catch((err) => {
        callBackMethod(err);
    })
}
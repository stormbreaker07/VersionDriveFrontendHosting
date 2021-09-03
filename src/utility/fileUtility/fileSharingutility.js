import { fileSharingService } from "../../services/filesServices/fileSharingService"


export const fileSharingUtility = (data, callBackMethod) => {
    const promise = fileSharingService(data);
    promise.then((response) => {
        if (response.data === "Action Successful") {
             callBackMethod("Success") 
            }
        else {
            callBackMethod("failure")
        }
    }).catch((err) => {
        console.log(err.response.data);
        alert(err.response.data);
    })
}
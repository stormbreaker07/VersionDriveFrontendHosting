import {myFileServices} from '../../services/filesServices/myFilesService';

export const myFileUtility = (userId) => {

    // const myFilePromise = myFileServices(userId);

    // myFilePromise.then((responseData) => {
    //     const response = {data : responseData ,
    //     status : 'ok'
    //     }
    //     responseRecorder(response.data);
    // })
    // .catch((error) => {
    //     const response = {data : error.response.data.message ,
    //         status : 'ok'
    //         }
    //     responseRecorder(response);
    //     console.log(error.response.data.message);
    // })

    return myFileServices(userId);
}
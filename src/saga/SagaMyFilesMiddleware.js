import { put, takeLatest } from "redux-saga/effects";
import { SAGA_MY_FILES_REQUEST } from "../store/staticVariable";
import {myFileUtility} from '../utility/fileUtility/myFilesUtility';
import {fetchFileActionSuccess ,fetchFileActionError} from '../store/actions/FetchMyFilesInfoAction'; 


function* forwardAction(action) {
    try {
        console.log('actionPayload' + action.payload);
        const response = yield myFileUtility(action.payload);
        console.log(response);
        yield put(fetchFileActionSuccess(response.data));

    }
    catch(error) {
        console.log(error);
        yield put(fetchFileActionError(error));
    }
}


export function* myFilesMiddleware() {
    console.log("inMyfilesmiddleware");
    yield takeLatest(SAGA_MY_FILES_REQUEST , forwardAction)
}
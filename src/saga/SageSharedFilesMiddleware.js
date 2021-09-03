import { put, takeLatest } from "redux-saga/effects";
import { SAGA_SHARED_FILES_REQUEST } from "../store/staticVariable";
import {sharedFilesUility} from '../utility/fileUtility/sharedFilesUtility';
import {fetchSharedFileActionSuccess ,fetchSharedFileActionError} from '../store/actions/fetchSharedFileActions'; 


function* forwardAction(action) {
    try {
        console.log('actionPayload' + action.payload);
        const response = yield sharedFilesUility(action.payload);
        console.log(response.data);
        yield put(fetchSharedFileActionSuccess(response.data));
    }
    catch(error) {
        console.log(error);
        yield put(fetchSharedFileActionError(error));
    }
}


export function* sharedFilesMiddleware() {
    console.log("inSharedfilesmiddleware");
    yield takeLatest(SAGA_SHARED_FILES_REQUEST , forwardAction)
}
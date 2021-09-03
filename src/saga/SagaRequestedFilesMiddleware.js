import { put, takeLatest } from "redux-saga/effects";
import { SAGA_REQUESTED_FILES_REQUEST } from "../store/staticVariable";
import {requestedFileUtility} from '../utility/fileUtility/requestedFilesUtility';
import {fetchRequestedFileActionSuccess ,fetchRequestedFileActionError} from '../store/actions/FetchRequestedFilesActions'; 


function* forwardAction(action) {
    try {
        console.log('actionPayload' + action.payload);
        const response = yield requestedFileUtility(action.payload);
        console.log(response.data);
        yield put(fetchRequestedFileActionSuccess(response.data));
    }
    catch(error) {
        console.log(error);
        yield put(fetchRequestedFileActionError(error));
    }
}


export function* RequestedFilesMiddleware() {
    console.log("inRequestedFilesmiddleware");
    yield takeLatest(SAGA_REQUESTED_FILES_REQUEST , forwardAction)
}
import { loginMiddleware} from './SagaloginMiddleware';
import { fork } from "redux-saga/effects";
import { myFilesMiddleware } from './SagaMyFilesMiddleware';
import { sharedFilesMiddleware } from './SageSharedFilesMiddleware';
import {RequestedFilesMiddleware} from './SagaRequestedFilesMiddleware';
import {deleteFileMiddleware} from './SagaDeleteFileMiddleware';


export default function* rootSaga() {

    yield fork(loginMiddleware)
    yield fork(myFilesMiddleware)
    yield fork(sharedFilesMiddleware)
    yield fork(RequestedFilesMiddleware)
    yield fork(deleteFileMiddleware)
}
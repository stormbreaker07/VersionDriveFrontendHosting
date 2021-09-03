import { all, put, takeLatest } from "redux-saga/effects"
import { deleteFileFailure, deleteFileSuccess } from "../store/actions/DeleteFIleAction";
import { deleteFileFromMyFiles } from "../store/actions/FetchMyFilesInfoAction";
import { deleteFileFromSharedFiles } from "../store/actions/fetchSharedFileActions";
import { SAGA_DELETE_FILE_REQUEST } from "../store/staticVariable"
import {deleteFileUtility} from '../utility/fileUtility/deleteFileUtility';


function* forwardAction(action) {
    try {
        deleteFileUtility(action.payload.userId , action.payload.fileId);
        yield all([
            put(deleteFileFromSharedFiles(action.payload.fileId)),
            put(deleteFileFromMyFiles(action.payload.fileId)),
            put(deleteFileSuccess()),
        ])
        
    }
    catch(err) {
        console.log(err);
        yield put(deleteFileFailure())
    }
} 


export function* deleteFileMiddleware() {
        yield takeLatest(SAGA_DELETE_FILE_REQUEST , forwardAction);
}
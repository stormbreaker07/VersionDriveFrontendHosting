
import { takeLatest, put } from "redux-saga/effects";
import { SAGA_LOGGED_IN_REQUEST } from "../store/staticVariable";
import {loginUtilityMethod} from '../utility/authUtility/loginUtility';
import {loginSuccess , loginFailure} from '../store/actions/LogginActions'


function* forwardAction(action) {
    try {
    const response = yield loginUtilityMethod(action.payload);
        yield put(loginSuccess(response.data));  
    }catch(err) {
        console.log(err.response.data.message)
        yield put(loginFailure(err.response.data.message));
   
    }
}


export function* loginMiddleware( ) {
    yield takeLatest(SAGA_LOGGED_IN_REQUEST , forwardAction);
}
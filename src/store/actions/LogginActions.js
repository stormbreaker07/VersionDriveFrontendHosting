import {LOGGED_IN_ERROR , LOGGED_IN_SUCCESS , LOGGED_IN_REQUEST , SAGA_LOGGED_IN_REQUEST, LOGGED_OUT} from '../staticVariable';


export const LoginRequest = (data) => {
    return {
        type : LOGGED_IN_REQUEST,
        payload : data
    }
}

export const loginSuccess = (data) => {
    return {
        type : LOGGED_IN_SUCCESS,
        payload : data
    }
}

export const loginFailure = (data) => {
    return {
        type : LOGGED_IN_ERROR ,
        payload : data
    }
}


export const sagaLoginRequest = (data) => {
    return {
        type : SAGA_LOGGED_IN_REQUEST,
        payload : data
    }
}

export const userLoggedOutAction = () => {
    return {
        type : LOGGED_OUT
    }
}
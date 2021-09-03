import { LOGGED_IN,LOGGED_OUT , MY_FILES,SHARED_FILES,REQUESTED_FILES } from '../staticVariable'; 

export const loggedInAction = () => {
    return { 
    type : LOGGED_IN,
    info : 'User logged in'
    }
}

export const loggedOutAction = () => {
    return { 
    type : LOGGED_OUT,
    info : 'User logged out'
    }
}

export const myFilesAction = () => {
    return { 
    type : MY_FILES,
    info : 'Move to my files'
    }
}

export const sharedFilesAction = () => {
    return { 
    type : SHARED_FILES,
    info : 'move to shared files'
    }
}

export const requestedFilesAction = () => {
    return { 
    type : REQUESTED_FILES,
    info : 'User requested files'
    }
}


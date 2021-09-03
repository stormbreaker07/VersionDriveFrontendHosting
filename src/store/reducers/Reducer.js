import { combineReducers } from "redux";
import {fetchMyFileInfoReducer} from './FetchFileInfoReducer';
import {loginReducer} from './LoginReducer';
import { fetchSharedFileInfoReducer } from './fetchSharedFilesReducer';
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {fetchRequestedFileInfoReducer} from './fetchRequestedFilesReducer'
import {deleteFileReducer} from './DeleteFileReducer'
import {currentFilesReducer} from './CurrentFileReducer'



const persistConfig = {
    key : 'root',
    storage,
    whitelist : ['Auth']
}




export const tempRootReducer = combineReducers({
    Auth : loginReducer,
    currentFiles : currentFilesReducer,
    fetchMyFileInfo : fetchMyFileInfoReducer,
    fetchSharedFileInfo : fetchSharedFileInfoReducer,
    fetchRequestedFileInfo : fetchRequestedFileInfoReducer,
    deleteFileStatus : deleteFileReducer
})


export const rootReducer = persistReducer(persistConfig , tempRootReducer );
import { rootReducer } from './reducers/Reducer';
import rootSaga from '../saga/rootSaga';
import createSagaMiddleware from '@redux-saga/core';
import {persistStore} from 'redux-persist';
const Redux = require('redux');



const applyMiddleware = Redux.applyMiddleware;
const sageMiddleware = createSagaMiddleware();

export const store = Redux.createStore(rootReducer , applyMiddleware(sageMiddleware));
sageMiddleware.run(rootSaga);

export const persistor = persistStore(store);


console.log(store.getState());

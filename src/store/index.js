import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import storage from 'redux-persist/lib/storage';

import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import rootReducer from '../reducers'; // the value from combineReducers

const persistConfig = {
    key: 'root',
    storage: storage,
    stateReconciler: autoMergeLevel2 // see "Merge Process" section for details.
};
const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware));
const pReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(pReducer, composedEnhancer);
export const persistor = persistStore(store);
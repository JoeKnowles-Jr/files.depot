import { combineReducers } from 'redux';
import { reducer as authReducer } from './auth';
import { reducer as filesReducer } from './files.reducer';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
    form: formReducer,
    files: filesReducer,
    auth: authReducer
});

export default rootReducer;

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Router, Switch } from 'react-router-dom';
import { PersistGate } from 'redux-persist/lib/integration/react';
import History from './history.js';
import Routes from './routes';

import { persistor, store } from './store';

import './style/style.css';

import registerServiceWorker from './registerServiceWorker';

/*
// UNCOMMENT IT FOR PRODUCTION
const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(rootReducer);
*/

/* COMMENT IT OUT FOR PRODUCTION */
// const store = createStore(
//     rootReducer,
//     compose(
//         applyMiddleware(reduxThunk),
//         window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
//     )
// );
//

// const token = localStorage.getItem('token');
// // if we have a token, consiger the user to be signed in
// if (token) {
//     const user = null;// = JSON.parse(localStorage.getItem('user'));
//     // we need to update application state
//     store.dispatch({ type: AUTH_USER, payload: { user: user } });
// }

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <BrowserRouter>
                <Router history={History} basename={'/tfa2'}>
                    <Switch>
                        <Routes />
                    </Switch>
                </Router>
            </BrowserRouter>
        </PersistGate>
    </Provider>, document.getElementById('root'));
registerServiceWorker();

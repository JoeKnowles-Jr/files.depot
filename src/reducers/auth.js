import {
    AUTH_USER,
    UNAUTH_USER,
    AUTH_ERROR
} from '../actions/types';

const token = localStorage.getItem("token");
const userString = localStorage.getItem("user");
let user;
if (userString) {
    // user = JSON.parse(userString);
    console.log(userString);
}

const initialState = token
    ? { authenticated: true, user }
    : { authenticated: false, user: null };

export const reducer = (state = initialState, action) => {

    switch (action.type) {
        case AUTH_USER:
            return { ...state, user: action.payload.user, error: '', authenticated: true }
        case UNAUTH_USER:
            console.log("reducer");
            return { ...state, user: null, authenticated: false }
        case AUTH_ERROR:
            return { ...state, user: null, error: action.payload }
        default:
            return state;
    }
};

import * as actionTypes from "store/session/action-types";

export const signIn = (email, authenticationString) => ({
    type: actionTypes.SIGN_IN_REQUEST,
    payload: { email, authenticationString }
});

export const setSessionLoading = () => ({
    type: actionTypes.SET_SESSION_LOADING
});

export const setSessionSuccess = user => ({
    type: actionTypes.SET_SESSION_SUCCESS,
    payload: { user }
});

export const setSessionError = error => ({
    type: actionTypes.SET_SESSION_ERROR,
    payload: { error }
});

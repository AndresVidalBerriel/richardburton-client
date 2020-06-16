import * as actionTypes from "store/session/action-types";

export const signIn = (email, authenticationString) => ({
    type: actionTypes.SIGN_IN_REQUEST,
    payload: { email, authenticationString }
});

export const setupSession = (user, token) => ({
    type: actionTypes.SETUP_SESSION,
    payload: { user, token }
});

export const resetSession = () => ({
    type: actionTypes.RESET_SESSION
});

export const updateSession = () => ({
    type: actionTypes.UPDATE_SESSION
});

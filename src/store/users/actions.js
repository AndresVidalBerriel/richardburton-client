import * as actionTypes from "store/users/action-types";

export const signUp = user => ({
    type: actionTypes.SIGN_UP_REQUEST,
    payload: { user }
});

export const setUserCreationLoading = () => ({
    type: actionTypes.SET_CREATION_LOADING
});

export const setUserCreationSuccess = user => ({
    type: actionTypes.SET_CREATION_SUCCESS
});

export const setUserCreationError = error => ({
    type: actionTypes.SET_CREATION_ERROR,
    payload: { error }
});

export const resetUserCreationState = () => ({
    type: actionTypes.RESET_CREATION_STATE
});

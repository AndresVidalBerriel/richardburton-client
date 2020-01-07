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

export const retrieveUser = id => ({
    type: actionTypes.RETRIEVE_USER_REQUEST,
    payload: { id }
});

export const setUserRetrievalLoading = () => ({
    type: actionTypes.SET_RETRIEVAL_LOADING
});

export const setUserRetrievalSuccess = user => ({
    type: actionTypes.SET_RETRIEVAL_SUCCESS,
    payload: { user }
});

export const setUserRetrievalError = error => ({
    type: actionTypes.SET_RETRIEVAL_ERROR,
    payload: { error }
});

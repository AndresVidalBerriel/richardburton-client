import * as actionTypes from "store/translations/action-types";

export const setTranslationCreationLoading = () => ({
    type: actionTypes.SET_CREATION_LOADING
});

export const setTranslationCreationSuccess = user => ({
    type: actionTypes.SET_CREATION_SUCCESS
});

export const setTranslationCreationError = error => ({
    type: actionTypes.SET_CREATION_ERROR,
    payload: { error }
});

export const resetTranslationCreationState = () => ({
    type: actionTypes.RESET_CREATION_STATE
});

export const retrieveTranslations = afterId => ({
    type: actionTypes.RETRIEVE_TRANSLATIONS_REQUEST,
    payload: { afterId }
});

export const retrieveTranslation = id => ({
    type: actionTypes.RETRIEVE_TRANSLATION_REQUEST,
    payload: { id }
});

export const setTranslationRetrievalLoading = () => ({
    type: actionTypes.SET_RETRIEVAL_LOADING
});

export const setTranslationRetrievalSuccess = data => ({
    type: actionTypes.SET_RETRIEVAL_SUCCESS,
    payload: { data }
});

export const setTranslationRetrievalError = error => ({
    type: actionTypes.SET_RETRIEVAL_ERROR,
    payload: { error }
});

export const resetTranslationRetrievalState = () => ({
    type: actionTypes.RESET_RETRIEVAL_STATE
});

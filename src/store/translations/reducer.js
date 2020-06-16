import * as actionTypes from "store/translations/action-types";

const initialState = {
    creation: { loading: false, error: undefined },
    retrieval: { loading: false, error: undefined, translation: undefined }
};

export default function TranslationReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case actionTypes.SET_CREATION_LOADING: {
            const creation = {
                ...state.creation,
                loading: true,
                error: undefined
            };
            return { ...initialState, creation };
        }

        case actionTypes.SET_CREATION_SUCCESS: {
            const creation = {
                ...state.creation,
                loading: false,
                error: undefined
            };
            return { ...state, creation };
        }

        case actionTypes.SET_CREATION_ERROR: {
            const { error } = payload;
            const creation = { ...state.creation, loading: false, error };
            return { ...state, creation };
        }

        case actionTypes.RESET_CREATION_STATE: {
            const creation = { ...initialState.creation };
            return { ...state, creation };
        }

        case actionTypes.SET_RETRIEVAL_LOADING: {
            const retrieval = {
                ...state.retrieval,
                loading: true,
                error: undefined,
                translation: undefined
            };
            return { ...initialState, retrieval };
        }

        case actionTypes.SET_RETRIEVAL_SUCCESS: {
            const { translation } = payload;
            const retrieval = {
                ...state.retrieval,
                loading: false,
                error: undefined,
                translation
            };
            return { ...state, retrieval };
        }

        case actionTypes.SET_RETRIEVAL_ERROR: {
            const { error } = payload;
            const retrieval = { ...state.retrieval, loading: false, error };
            return { ...state, retrieval };
        }

        case actionTypes.RESET_RETRIEVAL_STATE: {
            const retrieval = { ...initialState.retrieval };
            return { ...state, retrieval };
        }

        default: {
            return state;
        }
    }
}

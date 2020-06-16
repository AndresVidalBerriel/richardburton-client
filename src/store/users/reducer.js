import * as actionTypes from "store/users/action-types";

const initialState = {
    creation: { loading: false, error: undefined },
    retrieval: { loading: false, error: undefined, user: undefined }
};

export default function UserReducer(state = initialState, action) {
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

        default: {
            return state;
        }
    }
}

import * as actionTypes from "store/session/action-types";

const initialState = {
    loading: false,
    error: undefined,
    user: undefined,
    token: undefined
};

export default function SessionReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case actionTypes.SET_SESSION_LOADING: {
            return { ...initialState, loading: true, error: undefined };
        }
        case actionTypes.SET_SESSION_SUCCESS: {
            const { user } = payload;
            return { ...state, loading: false, error: undefined, user };
        }
        case actionTypes.SET_SESSION_ERROR: {
            const { error } = payload;
            return { ...state, loading: false, error };
        }

        case actionTypes.CLEAR_SESSION: {
            return { ...initialState };
        }
        default: {
            return state;
        }
    }
}

import * as actionTypes from "store/session/action-types";

const initialState = {
    loading: false,
    error: undefined,
    user: undefined
};

const SessionReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case actionTypes.SET_SESSION_LOADING:
            return { ...initialState, loading: true };

        case actionTypes.SET_SESSION_SUCCESS:
            const { user } = payload;
            return { ...state, loading: false, user };

        case actionTypes.SET_SESSION_ERROR:
            const { error } = payload;
            return { ...state, loading: false, error };

        default:
            return state;
    }
};

export default SessionReducer;

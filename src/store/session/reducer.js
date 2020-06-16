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
        case actionTypes.SETUP_SESSION: {
            const { user, token } = payload;
            return { ...initialState, user, token };
        }

        case actionTypes.RESET_SESSION: {
            return { ...initialState };
        }

        default: {
            return state;
        }
    }
}

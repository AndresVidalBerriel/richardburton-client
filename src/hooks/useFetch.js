import { useReducer } from "react";

const SET_LOADING = "SET_LOADING";
const SET_ERROR = "SET_ERROR";
const SET_SUCCESS = "SET_SUCCESS";
const RESET_STATE = "RESET_STATE";

const setLoading = () => ({ type: SET_LOADING });
const setError = error => ({ type: SET_ERROR, payload: { error } });
const setSuccess = response => ({ type: SET_SUCCESS, payload: { response } });
const resetState = () => ({ type: RESET_STATE });

const initialState = {
    loading: false,
    error: undefined,
    response: {}
};

function PromiseReducer(state, action) {
    const { type, payload } = action;

    switch (type) {
        case SET_LOADING: {
            return { ...initialState, loading: true };
        }
        case SET_SUCCESS: {
            const { response } = payload;
            return { ...initialState, response };
        }
        case SET_ERROR: {
            const { error } = payload;
            return { ...initialState, error };
        }
        case RESET_STATE: {
            return { ...initialState };
        }
        default:
            return state;
    }
}

export default function useFetch(asyncFunction) {
    const [state, dispatch] = useReducer(PromiseReducer, initialState);

    const fetch = async (...args) => {
        try {
            dispatch(setLoading());
            const response = await asyncFunction(...args);
            dispatch(setSuccess(response));
        } catch (error) {
            dispatch(setError(error));
        }
    };

    const reset = () => dispatch(resetState());

    return { ...state, fetch, reset };
}

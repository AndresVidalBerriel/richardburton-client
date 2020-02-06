import { useReducer } from "react";

const SET_LOADING = "SET_LOADING";
const SET_ERROR = "SET_ERROR";
const SET_SUCCESS = "SET_SUCCESS";

const setLoading = () => ({ type: SET_LOADING });
const setError = error => ({ type: SET_ERROR, payload: { error } });
const setSuccess = data => ({ type: SET_SUCCESS, payload: { data } });

const initialState = {
    loading: false,
    error: undefined,
    data: undefined
};

function PromiseReducer(state, action) {
    const { type, payload } = action;

    switch (type) {
        case SET_LOADING: {
            return { ...initialState, loading: true };
        }
        case SET_SUCCESS: {
            const { data } = payload;
            return { ...initialState, data };
        }
        case SET_ERROR: {
            const { error } = payload;
            return { ...initialState, error };
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
            dispatch(setSuccess(response.data));
        } catch (error) {
            dispatch(setError(error));
        }
    };

    return { ...state, fetch };
}

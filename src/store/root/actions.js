import * as actionTypes from "store/root/action-types";

export const reconfigure = ready => ({
    type: actionTypes.RECONFIGURE
});

export const setStoreReady = ready => ({
    type: actionTypes.SET_STORE_READY,
    payload: { ready }
});

import * as actionTypes from "store/root/action-types";

export const setStoreReady = ready => ({
    type: actionTypes.SET_STORE_READY,
    payload: { ready }
});

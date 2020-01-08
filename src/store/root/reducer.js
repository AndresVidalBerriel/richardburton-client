import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import { persistConfig } from "store/persist";

import { connectRouter } from "connected-react-router";
import { createBrowserHistory } from "history";

import SessionReducer from "store/session/reducer";
import UserReducer from "store/users/reducer";

import * as actionTypes from "store/root/action-types";

const initialState = {
    storeReady: false
};

function RootReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case actionTypes.SET_STORE_READY: {
            const ready = { payload };
            return { ...state, storeReady: ready };
        }

        default:
            return state;
    }
}

export const history = createBrowserHistory();

const rootReducer = combineReducers({
    root: RootReducer,
    router: connectRouter(history),
    session: SessionReducer,
    users: UserReducer
});

export default persistReducer(persistConfig, rootReducer);

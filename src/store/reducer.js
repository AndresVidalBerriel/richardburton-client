import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import { persistConfig } from "store/persist";

import { connectRouter } from "connected-react-router";
import { createBrowserHistory } from "history";

import SessionReducer from "store/session/reducer";
import UserReducer from "store/users/reducer";

export const history = createBrowserHistory();

const rootReducer = combineReducers({
    router: connectRouter(history),
    session: SessionReducer,
    users: UserReducer
});

export default persistReducer(persistConfig, rootReducer);

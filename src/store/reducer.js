import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import { persistConfig } from "store/persist";

import SessionReducer from "store/session/reducer";

const rootReducer = combineReducers({
    session: SessionReducer
});

export default persistReducer(persistConfig, rootReducer);

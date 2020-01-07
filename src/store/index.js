import { createStore, applyMiddleware, compose } from "redux";
import { persistStore } from "redux-persist";

import "regenerator-runtime/runtime";
import createSagaMiddleware from "redux-saga";
import rootSaga from "store/sagas";

import { routerMiddleware } from "connected-react-router";

import reducer, { history } from "store/reducer";

import { setAuthenticationToken } from "api/axios";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
    reducer,
    compose(applyMiddleware(sagaMiddleware, routerMiddleware(history)))
);
sagaMiddleware.run(rootSaga);

const persistor = persistStore(store, null, () => {
    const loggedUser = store.getState().session.user;
    if (loggedUser !== undefined) setAuthenticationToken(loggedUser.token);
});

export { store, persistor, history };

import { createStore, applyMiddleware, compose } from "redux";
import { persistStore } from "redux-persist";
import { routerMiddleware } from "connected-react-router";

import "regenerator-runtime/runtime";
import createSagaMiddleware from "redux-saga";

import rootSaga from "store/root/sagas";
import reducer, { history } from "store/root/reducer";
import { reconfigure } from "store/root/actions";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
    reducer,
    compose(applyMiddleware(sagaMiddleware, routerMiddleware(history)))
);
sagaMiddleware.run(rootSaga);

const persistor = persistStore(store, null, () => {
    store.dispatch(reconfigure());
});

export { store, persistor, history };

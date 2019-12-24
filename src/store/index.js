import { createStore, applyMiddleware } from "redux";
import { persistStore } from "redux-persist";

import "regenerator-runtime/runtime";
import createSagaMiddleware from "redux-saga";
import rootSaga from "store/sagas";

import reducer from "store/reducer";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

const persistor = persistStore(store);

export { store, persistor };

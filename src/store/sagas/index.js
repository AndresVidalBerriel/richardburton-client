import { all } from "redux-saga/effects";
import sessionRootSaga from "store/session/sagas";

export default function* rootSaga() {
    yield all([sessionRootSaga()]);
}

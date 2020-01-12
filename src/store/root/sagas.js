import { all } from "redux-saga/effects";
import sessionRootSaga from "store/session/sagas";
import userRootSaga from "store/users/sagas";
import translationRootSaga from "store/translations/sagas";

export default function* rootSaga() {
    yield all([sessionRootSaga(), userRootSaga(), translationRootSaga()]);
}

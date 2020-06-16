import { all, put, takeEvery, select } from "redux-saga/effects";
import sessionRootSaga from "store/session/sagas";
import translationRootSaga from "store/translations/sagas";
import * as actionTypes from "store/root/action-types";

import * as actions from "store/root/actions";
import * as sessionActions from "store/session/actions";

function* reconfigure() {
    yield put(sessionActions.updateSession());
    yield put(actions.setStoreReady(true));
}

function* watchReconfigure() {
    yield takeEvery(actionTypes.RECONFIGURE, reconfigure);
}

export default function* rootSaga() {
    yield all([sessionRootSaga(), translationRootSaga(), watchReconfigure()]);
}

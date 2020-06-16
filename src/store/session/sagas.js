import { put, takeEvery, all, select } from "redux-saga/effects";
import * as actionTypes from "store/session/action-types";
import * as actions from "store/session/actions";

import SessionController from "api/controllers/session";
import { UNAUTHORIZED } from "utils/http-status";
import { setAuthenticationToken } from "api/axios";

function* updateSession() {
    const { user, token } = yield select(state => state.session);

    try {
        if (token !== undefined) {
            setAuthenticationToken(token);

            yield put(actions.setSessionLoading());
            yield SessionController.verifyToken();
            yield put(actions.setSessionSuccess(user));
        }
    } catch (error) {
        setAuthenticationToken(undefined);

        yield put(actions.resetSessionState());
    }
}

function* watchUpdateSession() {
    yield takeEvery(actionTypes.UPDATE_SESSION, updateSession);
}

export default function* rootSaga() {
    yield all([watchUpdateSession()]);
}

import { put, takeEvery, all } from "redux-saga/effects";
import * as actionTypes from "store/session/action-types";

import SessionController from "api/controllers/session";

function* signIn(action) {
    const { email, authenticationString } = action.payload;

    try {
        const response = yield SessionController.signIn(
            email,
            authenticationString
        );
    } catch (error) {
        console.log(error);
    }
}

function* watchSignIn() {
    yield takeEvery(actionTypes.SIGN_IN_REQUEST, signIn);
}

export default function* rootSaga() {
    yield all([watchSignIn()]);
}

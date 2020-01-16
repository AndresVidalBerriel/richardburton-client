import { put, takeEvery, all, select } from "redux-saga/effects";
import * as actionTypes from "store/users/action-types";
import * as actions from "store/users/actions";
import { signIn } from "store/session/actions";

import UserController from "api/controllers/user";
import { CONFLICT } from "utils/http-status";

function* signUp(action) {
    const { user } = action.payload;

    try {
        yield put(actions.setUserCreationLoading());
        const response = yield UserController.signUp(user);
        yield put(actions.setUserCreationSuccess());
        yield put(signIn(user.email, user.authenticationString));
    } catch (error) {
        switch (error.response.status) {
            case CONFLICT: {
                error.message = "error:emailAlreadyRegistered";
            }
        }

        yield put(actions.setUserCreationError(error));
    }
}

function* watchSignUpRequest() {
    yield takeEvery(actionTypes.SIGN_UP_REQUEST, signUp);
}

function* retrieveUser(action) {
    const { id } = action.payload;

    try {
        yield put(actions.setUserRetrievalLoading());
        const response = yield UserController.retrieveUser(id);
        yield put(actions.setUserRetrievalSuccess(response.data));
    } catch (error) {
        yield put(actions.setUserRetrievalError(error));
    }
}

function* watchRetrieveUserRequest() {
    yield takeEvery(actionTypes.RETRIEVE_USER_REQUEST, retrieveUser);
}

export default function* rootSaga() {
    yield all([watchSignUpRequest(), watchRetrieveUserRequest()]);
}

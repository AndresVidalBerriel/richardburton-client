import { put, takeEvery, all } from "redux-saga/effects";
import * as actionTypes from "store/translations/action-types";
import * as actions from "store/translations/actions";

import TranslationController from "api/controllers/translation";

function* retrieveTranslation(action) {
    const { id } = action.payload;

    try {
        yield put(actions.setTranslationRetrievalLoading());
        const response = yield TranslationController.retrieveTranslation(id);
        yield put(actions.setTranslationRetrievalSuccess(response.data));
    } catch (error) {
        yield put(actions.setTranslationRetrievalError(error));
    }
}

function* watchRetrieveTranslationRequest() {
    yield takeEvery(
        actionTypes.RETRIEVE_TRANSLATION_REQUEST,
        retrieveTranslation
    );
}

export default function* rootSaga() {
    yield all([watchRetrieveTranslationRequest()]);
}

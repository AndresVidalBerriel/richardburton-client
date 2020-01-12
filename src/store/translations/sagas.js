import { put, takeEvery, all, select } from "redux-saga/effects";
import * as actionTypes from "store/translations/action-types";
import * as actions from "store/translations/actions";

import TranslationController from "api/controllers/translation";

function* retrieveTranslations(action) {
    const { afterId } = action.payload;

    try {
        yield put(actions.setTranslationRetrievalLoading());
        const response = yield TranslationController.retrieveTranslations(
            afterId
        );
        yield put(actions.setTranslationRetrievalSuccess(response.data));
    } catch (error) {
        yield put(actions.setTranslationRetrievalError(error));
    }
}

function* watchRetrieveTranslationsRequest() {
    yield takeEvery(
        actionTypes.RETRIEVE_TRANSLATIONS_REQUEST,
        retrieveTranslations
    );
}

export default function* rootSaga() {
    yield all([watchRetrieveTranslationsRequest()]);
}

import api from "api/axios";
import { translationEndpoints as endpoints } from "api/endpoints";

export default class TranslatedBookController {
    static retrieveTranslations(afterId, pageSize, searchFor) {
        const { method, url } = endpoints.retrieveTranslations(
            afterId,
            pageSize,
            searchFor
        );
        return api[method](url);
    }

    static retrieveTranslation(id) {
        const { method, url } = endpoints.retrieveTranslation(id);
        return api[method](url);
    }
}

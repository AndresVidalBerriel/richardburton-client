import api from "api/axios";
import { translationEndpoints as endpoints } from "api/endpoints";

export default class TranslatedBookController {
    static retrieveTranslations(afterId) {
        const { method, url } = endpoints.retrieveTranslations(afterId);
        return api[method](url);
    }

    static retrieveTranslation(id) {
        const { method, url } = endpoints.retrieveTranslation(id);
        return api[method](url);
    }
}

import api from "api/axios";
import { translationEndpoints as endpoints } from "api/endpoints";

export default class TranslatedBookController {
    static retrieveTranslations(parameters) {
        const { method, url } = endpoints.retrieveTranslations(parameters);
        return api[method](url);
    }

    static retrieveTranslation(id) {
        const { method, url } = endpoints.retrieveTranslation(id);
        return api[method](url);
    }

    static registerTranslation(translatedBook) {
        const { method, url } = endpoints.registerTranslation();
        return api[method](url, translatedBook);
    }
}

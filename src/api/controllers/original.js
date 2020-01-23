import api from "api/axios";
import { originalsEndpoints as endpoints } from "api/endpoints";

export default class OriginalBookController {
    static retrieveOriginals(parameters) {
        const { method, url } = endpoints.retrieveOriginals(parameters);
        return api[method](url);
    }
}

import api from "api/axios";
import { authorEndpoints as endpoints } from "api/endpoints";

export default class AuthorController {
    static retrieveAuthors(parameters) {
        const { method, url } = endpoints.retrieveAuthors(parameters);
        return api[method](url);
    }
}

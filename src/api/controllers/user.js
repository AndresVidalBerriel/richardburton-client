import api from "api/axios";
import { userEndpoints as endpoints } from "api/endpoints";

export default class UserController {
    static signUp(user) {
        const { method, url } = endpoints.signUp;
        return api[method](url, user);
    }
}

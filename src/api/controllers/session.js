import api from "api/axios";
import { sessionEndpoints as endpoints } from "api/endpoints";

export default class SessionController {
    static signIn(email, authenticationString) {
        const { method, url } = endpoints.signIn;

        return api[method](url, undefined, {
            auth: {
                username: email,
                password: authenticationString
            }
        });
    }
}

export const sessionEndpoints = {
    signIn: {
        method: "post",
        url: "/session"
    }
};

export const userEndpoints = {
    signUp: {
        method: "post",
        url: "/users"
    },

    retrieveUser: {
        method: "get",
        url: "/users/{email}"
    }
};

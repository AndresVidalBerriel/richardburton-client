import { buildSearchQueryString } from "api/utils";

export const sessionEndpoints = {
    signIn: () => ({
        method: "post",
        url: "/session"
    })
};

export const userEndpoints = {
    signUp: () => ({
        method: "post",
        url: "/users"
    }),

    retrieveUser: id => ({
        method: "get",
        url: `/users/${id}`
    })
};

export const translationEndpoints = {
    retrieveTranslations: parameters => ({
        method: "get",
        url: `/translations?${buildSearchQueryString(parameters)}`
    }),

    retrieveTranslation: id => ({
        method: "get",
        url: `/translations/${id}`
    }),

    registerTranslation: () => ({
        method: "post",
        url: "/translations"
    })
};

export const originalsEndpoints = {
    retrieveOriginals: parameters => ({
        method: "get",
        url: `/originals?${buildSearchQueryString(parameters)}`
    })
};

export const authorEndpoints = {
    retrieveAuthors: parameters => ({
        method: "get",
        url: `/authors?${buildSearchQueryString(parameters)}`
    })
};

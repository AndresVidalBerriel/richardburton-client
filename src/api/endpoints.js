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
    retrieveTranslations: afterId => ({
        method: "get",
        url: `/translations?after-id=${afterId}`
    }),

    retrieveTranslation: id => ({
        method: "get",
        url: `/translations/${id}`
    })
};

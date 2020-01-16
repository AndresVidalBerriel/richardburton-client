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
    retrieveTranslations: (afterId, pageSize, searchFor) => {
        const queryParams = [];

        if (afterId) queryParams.push(`after-id=${afterId}`);
        if (pageSize) queryParams.push(`page-size=${pageSize}`);
        if (searchFor) queryParams.push(`search=${searchFor}`);

        const queryString = queryParams.join("&");

        return {
            method: "get",
            url: `/translations?${queryString}`
        };
    },

    retrieveTranslation: id => ({
        method: "get",
        url: `/translations/${id}`
    })
};

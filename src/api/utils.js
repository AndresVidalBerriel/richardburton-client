export const buildSearchQueryString = ({
    afterId,
    pageSize,
    searchFor,
    searchOnDefaultFields
}) => {
    const queryParams = [];

    if (afterId) queryParams.push(`after-id=${afterId}`);
    if (pageSize) queryParams.push(`page-size=${pageSize}`);
    if (searchFor) queryParams.push(`search=${encodeURI(searchFor)}`);
    if (searchOnDefaultFields) queryParams.push(`use-default-fields=true`);

    return queryParams.join("&");
};
